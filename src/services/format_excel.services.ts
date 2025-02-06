import * as xlsx from 'xlsx';
import { GROUPSHEETNAME, NEWBUCKETSHEETNAME, NEWORGSHEETNAME, NEWPERMISSIONSHEETNAME, NEWSIGNPERSONSHEETNAME, NEWUSERINFOSHEETNAME, OLDORGSHEETNAME, OLDUSERINFOSHEETNAME, SHEETREBEL } from '../config/format_sheet_config';
import { OrganizeToModel, FormatOrganizeStructure } from './format_method/organize_structure';
import { orgModel } from '../models/formatExcel/organize_structure_model';
import { groupModel } from '../models/formatExcel/group_model';
import { GroupFormat, GroupToJson } from './format_method/group';
import { newUserInfoModel, oldUserInfoModel } from '../models/formatExcel/user_info';
import { FormatUserInfo, UserInfoToModel } from './format_method/user_info';
import { FormatBucket } from './format_method/bucket';
import formatPermission from './format_method/permission';
import formatSignPerson from './format_method/signPerson';

export async function FormatExcel(fileBuffer: Buffer, fileName: string): Promise<[Buffer, string]> {
    const tempAffName = fileName;
    const sheetError = 'ไม่สามารถอ่านชีทในไฟล์ Excel ได้เนื่องจากชื่อไม่ถูกต้องหรือไม่มีหน้าชีทนั้นอยู่';
    const readErrorReason = 'ไม่สามารถอ่านข้อมูลได้เนื่องจากโครงสร้างไม่ถูกต้องหรือไม่มีข้อมูล';
    let errorLog: string[] = [];

    try {
        let workbook = xlsx.read(fileBuffer, { type: 'buffer' });
        const sheetNames = workbook.SheetNames;

        //const allSheetsData: Record<string, any[]> = {};

        //ORGANIZE
        let oldOrgData: orgModel[] = [];
        let uniqueOrgData: orgModel[] = [];
        let newOrgData: orgModel[] = [];
        let newOrgArr: (string | number)[][] = [];

        //GROUP
        let groupData: groupModel[] = [];
        let groupArr: (string | number)[][] = [];

        //USER INFO
        let oldUserData: oldUserInfoModel[] = [];
        let newUserData: newUserInfoModel[] = [];
        let userArr: (string | number)[][] = [];

        //BUCKET
        let bucketArr: (string | number)[][] = [];

        //PERMISSION
        let permissionArr: (string | number)[][] = [];

        //SIGN-PERSON
        let signPersonArr: (string | number)[][] = [];

        let index: number = 0;
        let sheetRebel: number = 0;
        let status: Boolean = true;

        while (index < sheetNames.length && status) {
            const sheet = workbook.Sheets[sheetNames[index]];
            // console.log('sheet name : '+ workbook.SheetNames[index]+ ' ,rebel : '+SHEETREBEL[sheetRebel]);

            if (sheetNames[index] == SHEETREBEL[sheetRebel]) {
                if (OLDORGSHEETNAME == SHEETREBEL[sheetRebel]) {
                    //USE LIBERY XLSX TO GET DATA FROM EXCEL AND CONVERT DATA TO JSON TYPE
                    const jsonData = xlsx.utils.sheet_to_json(sheet);

                    //GROUP SHEET DATA
                    oldOrgData = OrganizeToModel(jsonData);

                    //DELETE DUPLICATE DATA OF GROUP SHEET DATA
                    if(oldOrgData.length) {
                        uniqueOrgData = Array.from(
                            new Map(oldOrgData.map(data => [data.doc, data])).values()
                        );
                    } else {
                        errorLog.push(`ชีทโครงสร้าง : ${readErrorReason}`);
                    }

                    //NEW FORMAT OF ORGANIZE STRUCTURE 
                    if (uniqueOrgData.length) {
                        [newOrgData, newOrgArr] = FormatOrganizeStructure(uniqueOrgData, tempAffName);
                    }

                    //GROUP SHEET DATA
                    if (uniqueOrgData.length) {
                        groupData = GroupToJson(uniqueOrgData, tempAffName);
                        groupArr = GroupFormat(groupData);
                    }

                    //BUCKET SHEET DATA
                    if (uniqueOrgData.length && groupData) {
                        bucketArr = FormatBucket(uniqueOrgData, groupData);
                    }

                } else if (OLDUSERINFOSHEETNAME == SHEETREBEL[sheetRebel]) {
                    //CONFIG XLSX LIBRARY TO GET ANY ROW OF SHEET
                    const jsonData = xlsx.utils.sheet_to_json(sheet, {
                        raw: true,
                        defval: "",
                    });

                    //USER INFO SHEET 
                    oldUserData = UserInfoToModel(jsonData);
                    if (oldUserData && newOrgData.length) {
                        [newUserData, userArr] = FormatUserInfo(tempAffName, oldUserData, newOrgData);
                    } else {
                        errorLog.push(`ชีทข้อมูลผู้ใช้ : ${readErrorReason}`);
                    }

                    //PERMISSION SHEET DATA
                    if (uniqueOrgData.length && groupData.length && newUserData.length) {
                        permissionArr = formatPermission(uniqueOrgData, groupData, newUserData);
                    }

                    //SIGN-PERSON SHEET DATA
                    if (oldOrgData.length && groupData.length && newUserData.length) {
                        signPersonArr = formatSignPerson(oldOrgData, groupData, newUserData);
                    }
                }

                ++sheetRebel;
            }

            if (sheetRebel >= SHEETREBEL.length) {
                status = false;
            }

            ++index;
        }

        if (newOrgArr.length && groupArr && userArr.length && bucketArr.length && permissionArr) {
            //All SHEET OF ONE EXCEL FILE
            const datasets: { name: string; data: (string | number)[][] }[] = [
                { name: NEWORGSHEETNAME, data: newOrgArr },
                { name: GROUPSHEETNAME, data: groupArr },
                { name: NEWUSERINFOSHEETNAME, data: userArr },
                { name: NEWBUCKETSHEETNAME, data: bucketArr },
                { name: NEWPERMISSIONSHEETNAME, data: permissionArr },
                { name: NEWSIGNPERSONSHEETNAME, data: signPersonArr }
            ];

            //CREATE NEW WORKBOOK
            workbook = xlsx.utils.book_new();

            //CREATE NEW EXCEL FILE THAT HAVE NEW SHEET INSIDE IT
            datasets.forEach(dataset => {
                const worksheet: xlsx.WorkSheet = xlsx.utils.aoa_to_sheet(dataset.data);
                xlsx.utils.book_append_sheet(workbook, worksheet, dataset.name);
            });

            //SAVE FILE
            //xlsx.writeFile(workbook, "FormatSheetsTest.xlsx"); SAVE ON LOCAL
            const buffer = xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });

            return [buffer, errorLog.join("\n")];
        } else {
            errorLog.push(sheetError);
            return [Buffer.alloc(0), errorLog.join("\n")];
        }
    } catch (error) {
        return [Buffer.alloc(0), errorLog.join("\n")];
    }
}

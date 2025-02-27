import * as xlsx from 'xlsx';
import { GROUP_SHEET_NAME, NEW_BUCKET_SHEET_NAME, NEW_ORG_SHEET_NAME, NEW_PERMISSION_SHEET_NAME, NEW_SIGN_PERSON_SHEET_NAME, NEW_USERINFO_SHEET_NAME, OLD_ORG_SHEET_NAME, OLD_USERINFO_SHEET_NAME, SHEETREBEL } from '../config/format_sheet_config';
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
    const sheetError = 'ไม่เจอชีทเนื่องจากชื่อไม่ถูกต้องหรือไม่มีหน้าชีทนั้นอยู่';
    const readErrorReason = 'ไม่สามารถอ่านข้อมูลในชีทได้เนื่องจากโครงสร้างไม่ถูกต้องหรือไม่มีข้อมูล';
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
        let sheetNullData: number = 0;
        let status: Boolean = true;

        while (index <= sheetNames.length - 1 && status) {
            const sheet = workbook.Sheets[sheetNames[index]];
            // console.log('sheet name : '+ workbook.SheetNames[index]+ ' ,rebel : '+SHEETREBEL[sheetRebel]);

            if (sheetNames[index] == SHEETREBEL[sheetRebel]) {
                if (OLD_ORG_SHEET_NAME == SHEETREBEL[sheetRebel]) {

                    //USE LIBERY XLSX TO GET DATA FROM EXCEL AND CONVERT DATA TO JSON TYPE
                    const jsonData = xlsx.utils.sheet_to_json(sheet);

                    //GROUP SHEET DATA
                    oldOrgData = OrganizeToModel(jsonData);

                    //DELETE DUPLICATE DATA OF GROUP SHEET DATA
                    if (oldOrgData.length) {
                        sheetNullData++; //ADD NULL SHEET DATA INDEX TO THE NEXT ONE

                        uniqueOrgData = Array.from(
                            new Map(oldOrgData.map(data => [data.doc, data])).values()
                        );
                    } else {
                        errorLog.push(`ชีท "โครงสร้าง" : ${readErrorReason}`);
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

                } else if (OLD_USERINFO_SHEET_NAME == SHEETREBEL[sheetRebel]) {
                    //CONFIG XLSX LIBRARY TO GET ANY ROW OF SHEET
                    const jsonData = xlsx.utils.sheet_to_json(sheet, {
                        raw: true,
                        defval: "",
                        blankrows: false, 
                        skipHidden: true 
                    });

                    //USER INFO SHEET 
                    oldUserData = UserInfoToModel(jsonData);
                    if (oldUserData.length) {
                        sheetNullData++; //ADD NULL SHEET DATA INDEX TO THE NEXT ONE

                        if (newOrgData.length) {
                            [newUserData, userArr] = FormatUserInfo(tempAffName, oldUserData, newOrgData);
                        }
                    } else {
                        errorLog.push(`ชีท "ข้อมูลผู้ใช้" : ${readErrorReason}`);
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

            if (sheetRebel > SHEETREBEL.length - 1) {
                status = false;
            }

            ++index;
        }

        if (newOrgArr.length && groupArr && userArr.length && bucketArr.length && permissionArr) {

            //All SHEET OF ONE EXCEL FILE
            const datasets: { name: string; data: (string | number)[][] }[] = [
                { name: NEW_ORG_SHEET_NAME, data: newOrgArr },
                { name: GROUP_SHEET_NAME, data: groupArr },
                { name: NEW_USERINFO_SHEET_NAME, data: userArr },
                { name: NEW_BUCKET_SHEET_NAME, data: bucketArr },
                { name: NEW_PERMISSION_SHEET_NAME, data: permissionArr },
                { name: NEW_SIGN_PERSON_SHEET_NAME, data: signPersonArr }
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
        } else if (sheetRebel <= SHEETREBEL.length - 1 && sheetRebel == sheetNullData) { //CHECK IF SHEET ARE NOT FOUND OR NOT
            errorLog.push(`ชีท "${SHEETREBEL[sheetRebel]}" : ${sheetError}`);
            return [Buffer.alloc(0), errorLog.join("\n")];
        } else {
            return [Buffer.alloc(0), errorLog.join("\n")];
        }
    } catch (error) {
        console.log(error);
        return [Buffer.alloc(0), errorLog.join("\n")];
    }
}

import * as xlsx from 'xlsx';
import { GROUPSHEETNAME, NEWBUCKETSHEETNAME, NEWORGSHEETNAME, NEWUSERINFOSHEETNAME, OLDORGSHEETNAME, OLDUSERINFOSHEETNAME, SHEETREBEL } from '../config/formatSheetConfig';
import { organizeToModel, formatOrganizeStructure } from './formatMethod/OrganizeStructure';
import { orgModel } from '../models/formatExcel/OrganizeStructureModel';
import { groupModel } from '../models/formatExcel/GroupModel';
import { groupFormat, groupToJson } from './formatMethod/Group';
import { oldUserInfoModel } from '../models/formatExcel/UserInfo';
import { formatUserInfo, userInfoToModel } from './formatMethod/UserInfo';
import { formatBucket } from './formatMethod/Bucket';
import formatPermission from './formatMethod/Permission';

async function formatExcel(fileBuffer: Buffer): Promise<any> {
    const tempAffName = "test";

    try {
        let workbook = xlsx.read(fileBuffer, { type: 'buffer' });
        const sheetNames = workbook.SheetNames;

        const allSheetsData: Record<string, any[]> = {};

        //ORGANIZE
        let oldOrgData: orgModel[] = [];
        let uniqueOrgData: orgModel[] = [];
        let newOrgData: orgModel[] = [];
        let newOrgArr: (string | number)[][] = [];

        //GROUP
        let groupData: groupModel[] = [];
        let groupArr: (string | number)[][] = [];

        //USER INFO
        let userData: oldUserInfoModel[] = [];
        let userArr: (string | number)[][] = [];

        //BUCKET
        let bucketArr: (string | number)[][] = [];

        //PERMISSION
        let permissionArr: (string | number)[][] = [];

        let index: number = 0;
        let sheetRebel: number = 0;
        let status: Boolean = true;

        while (index < sheetNames.length && status) {
            const sheet = workbook.Sheets[sheetNames[index]];
            // console.log('sheet name : '+ workbook.SheetNames[index]+ ' ,rebel : '+SHEETREBEL[sheetRebel]);

            if (sheetNames[index] == SHEETREBEL[sheetRebel]) {
                if (OLDORGSHEETNAME == SHEETREBEL[sheetRebel]) {
                    const jsonData = xlsx.utils.sheet_to_json(sheet);

                    //GROUP SHEET DATA
                    oldOrgData = organizeToModel(jsonData);

                    /*oldOrgData.forEach(data => {
                        console.log(data.doc+', '+data.pCommit,', ',data.pPermit,', ',data.type);
                    });*/

                    //DELETE DUPLICATE DATA
                    uniqueOrgData = Array.from(
                        new Map(oldOrgData.map(data => [data.doc, data])).values()
                    );

                    //NEW FORMAT OF ORGANIZE STRUCTURE 
                    if (uniqueOrgData.length) {
                        [newOrgData, newOrgArr] = formatOrganizeStructure(uniqueOrgData, tempAffName);
                    }

                    //GROUP SHEET DATA
                    if (uniqueOrgData.length) {
                        groupData = groupToJson(uniqueOrgData, tempAffName);
                        groupArr = groupFormat(groupData);
                    }

                    //BUCKET SHEET DATA
                    if (uniqueOrgData.length && groupData) {
                        bucketArr = formatBucket(uniqueOrgData, groupData);
                    }

                    //PERMISSION SHEET DATA
                    if (uniqueOrgData.length && groupData.length) {
                        //permissionArr = formatPermission(uniqueOrgData, groupData);
                    }

                } else if (OLDUSERINFOSHEETNAME == SHEETREBEL[sheetRebel]) {
                    const jsonData = xlsx.utils.sheet_to_json(sheet, {
                        raw: true,
                        defval: "",
                    });

                    //USER INFO SHEET 
                    userData = userInfoToModel(jsonData);
                    if (userData && newOrgData.length) {
                        userArr = formatUserInfo(tempAffName, userData, newOrgData);
                    }
                }

                ++sheetRebel;
            }

            if (sheetRebel >= SHEETREBEL.length) {
                status = false;
            }

            ++index;
        }

        if (newOrgArr.length && groupArr && userArr.length && bucketArr.length) {
            //All SHEET OF ONE EXCEL FILE
            const datasets: { name: string; data: (string | number)[][] }[] = [
                { name: NEWORGSHEETNAME, data: newOrgArr },
                { name: GROUPSHEETNAME, data: groupArr },
                { name: NEWUSERINFOSHEETNAME, data: userArr },
                { name: NEWBUCKETSHEETNAME, data: bucketArr }
            ];

            //CREATE NEW NEW WORKBOOK
            workbook = xlsx.utils.book_new();

            //CREATE NEW EXCEL FILE THAT HAVE NEW SHEET INSIDE IT
            datasets.forEach(dataset => {
                const worksheet: xlsx.WorkSheet = xlsx.utils.aoa_to_sheet(dataset.data);
                xlsx.utils.book_append_sheet(workbook, worksheet, dataset.name);
            });

            //SAVE FILE
            xlsx.writeFile(workbook, "FormatSheetsTest.xlsx");
        } else {
            return null;
        }

        return 'cool';
    } catch (error) {
        return null;
    }
}

export {
    formatExcel
}
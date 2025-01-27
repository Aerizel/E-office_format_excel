import * as xlsx from 'xlsx';
import { NEWORGSHEETNAME, SHEETREBEL } from '../config/formatSheet';
import { organizeStructure, organizeToJson } from './formatMethod/OrganizeStructure';
import { organizeJsonModel } from '../models/formatExcel/organizeStructure';

async function formatExcel(fileBuffer: Buffer): Promise<any> {
    try {
        let workbook = xlsx.read(fileBuffer, { type: 'buffer' });
        const sheetNames = workbook.SheetNames;

        //const allSheetsData: Record<string, any[]> = {};

        //ORGANIZE
        let oldOrgData: organizeJsonModel[] = [];
        let uniqueOrgData: organizeJsonModel[] = [];
        let newOrgData: (string | number)[][] = [];

        let index: number = 0;
        let sheetRebel: number = 0;
        let status: Boolean = true;

        while (index < sheetNames.length && status) {
            const sheet = workbook.Sheets[sheetNames[index]];
            // console.log('sheet name : '+ workbook.SheetNames[index]+ ' ,rebel : '+SHEETREBEL[sheetRebel]);

            if (sheetNames[index] == SHEETREBEL[sheetRebel]) {
                const jsonData = xlsx.utils.sheet_to_json(sheet);

                switch (sheetRebel) {
                    case 0: oldOrgData = organizeToJson(jsonData);
                        //Delete duplicate data
                        uniqueOrgData = Array.from(
                            new Map(oldOrgData.map(data => [data.doc, data])).values()
                        );
                        newOrgData = organizeStructure(uniqueOrgData);
                    default:
                }

                /*oldOrganizeData.forEach(data => {
                  console.log(data.doc+', '+data.pCommit,', ',data.pPermit);
                });*/

                ++sheetRebel;
            }

            ++index;

            if (sheetRebel >= SHEETREBEL.length) {
                status = false;
            }
        }

        //All SHEET OF ONE EXCEL FILE
        const datasets: { name: string; data: (string | number)[][] }[] = [
            { name: NEWORGSHEETNAME, data: newOrgData },
        ];

        //CREATE NEW NEW WORKBOOK
        workbook = xlsx.utils.book_new();

        //CREATE NEW EXCEL FILE THAT HAVE NEW SHEET INSIDE IT
        datasets.forEach(dataset => {
            const worksheet: xlsx.WorkSheet = xlsx.utils.aoa_to_sheet(dataset.data);
            xlsx.utils.book_append_sheet(workbook, worksheet, dataset.name);
        });

        //SAVE FILE
        xlsx.writeFile(workbook, "DynamicSheets.xlsx");

        return newOrgData;
    } catch (error) {
        return null;
    }
}

export {
    formatExcel
}
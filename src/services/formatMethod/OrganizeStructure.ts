import { NEWORGCOLUMN, OLDORGCOLUMN, STARTORGCODE } from "../../config/formatSheet";
import { organizeJsonModel } from "../../models/formatExcel/organizeStructure";

function organizeToJson(sheetData: any): organizeJsonModel[] {
    const orgNameLabel: string = OLDORGCOLUMN[0];
    const statusLabel: string = OLDORGCOLUMN[1];
    const pCommitLabel: string = OLDORGCOLUMN[2];
    const pPermitLabel: string = OLDORGCOLUMN[3];

    const orgStr = JSON.stringify(sheetData);
    const orgObj = JSON.parse(orgStr);
    const orgData: organizeJsonModel[] = [];

    for (var data of orgObj) {
        const orgName: string = data[orgNameLabel];
        const orgStatus: boolean = data[statusLabel];
        const pCommit: string = data[pCommitLabel];
        const pPermit: string = data[pPermitLabel];

        if (orgName && (orgStatus != null || pCommit || pPermit)) {
            const newformat: organizeJsonModel = {
                doc: orgName,
                pCommit: pCommit,
                pPermit: pPermit
            }
            orgData.push(newformat);
        }
    }

    orgData.splice(0, 1);

    return orgData;
}

function organizeStructure(sheetData: organizeJsonModel[]): (string | number)[][] {
    let chcodemp = STARTORGCODE - 1;
    const orgColumn: string[] = [NEWORGCOLUMN[0], NEWORGCOLUMN[1], NEWORGCOLUMN[2], NEWORGCOLUMN[3]];
    const affiliation1: string[] = ['test', '', ''];

    /*const orgData: (string | number)[][] = sheetData.map((data, index) => {
        if (index % 2) {
            ++chcodemp;
            return ['', '', data.doc, chcodemp];
        } else {
            return ['', data.doc, '', ''];
        }
    });*/

    const orgData: (string | number)[][] = []
    sheetData.map((data) => {
        ++chcodemp;
        orgData.push(['', data.doc, '', '']);
        orgData.push(['', '', data.doc, chcodemp]);
    });

    orgData.splice(0, 0, orgColumn);
    orgData.splice(1, 0, affiliation1);

    return orgData;
}

export {
    organizeToJson,
    organizeStructure
}


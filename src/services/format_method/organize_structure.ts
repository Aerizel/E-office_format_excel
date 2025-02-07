import { NEW_ORG_COLUMN, OLD_ORG_COLUMN, START_ORG_CODE } from "../../config/format_sheet_config";
import { orgModel } from "../../models/formatExcel/organize_structure_model";

export function OrganizeToModel(sheetData: any): orgModel[] {
    const orgStr = JSON.stringify(sheetData);
    const orgObj = JSON.parse(orgStr);

    const orgData: orgModel[] = [];
    let type: number = 1;

    for (var data of orgObj) {
        const orgName: string = data[OLD_ORG_COLUMN.doc];
        const orgStatus: boolean = data[OLD_ORG_COLUMN.status];
        const pCommit: string = data[OLD_ORG_COLUMN.pCommit];
        const pPermit: string = data[OLD_ORG_COLUMN.pPermit];

        if (orgName === OLD_ORG_COLUMN.doc2) {
            type = 2;
        }

        if (orgName && (orgStatus != null || pCommit || pPermit)) {
            const newformat: orgModel = {
                doc: orgName,
                pCommit: pCommit,
                pPermit: pPermit,
                chcodemp: null,
                type: type,
            }
            orgData.push(newformat);
        }
    }

    orgData.splice(0, 1);

    return orgData;
}

export function FormatOrganizeStructure(sheetData: orgModel[], affName1: string): [orgModel[], (string | number)[][]] {
    let chcodemp = START_ORG_CODE - 1;
    const orgColumn: string[] = [NEW_ORG_COLUMN.affiliation1, NEW_ORG_COLUMN.affiliation2, NEW_ORG_COLUMN.affiliation3, NEW_ORG_COLUMN.chrcodemp];
    const affiliation1: string[] = [affName1, '', ''];

    /*const orgData: (string | number)[][] = sheetData.map((data, index) => {
        if (index % 2) {
            ++chcodemp;
            return ['', '', data.doc, chcodemp];
        } else {
            return ['', data.doc, '', ''];
        }
    });*/

    const orgArr: (string | number)[][] = [];
    const orgData: orgModel[] = [];

    sheetData.map((data) => {
        ++chcodemp;
        orgArr.push(['', data.doc, '', '']);
        orgArr.push(['', '', data.doc, chcodemp]);

        const orgTempData: orgModel = {
            doc: data.doc,
            pCommit: data.pCommit,
            pPermit: data.pPermit,
            chcodemp: chcodemp,
            type: data.type
        }
        orgData.push(orgTempData);
    });

    orgArr.splice(0, 0, orgColumn);
    orgArr.splice(1, 0, affiliation1);

    return [
        orgData,
        orgArr
    ];
}

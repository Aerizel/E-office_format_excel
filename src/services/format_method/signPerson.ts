import { SIGNPERSONCOLUMN } from "../../config/format_sheet_config";
import { groupModel } from "../../models/formatExcel/group_model";
import { orgModel } from "../../models/formatExcel/organize_structure_model";
import { newUserInfoModel } from "../../models/formatExcel/user_info";

export default function FormatSignPerson(orgData: orgModel[], groupData: groupModel[], userData: newUserInfoModel[]): (string | number)[][] {
    const columnName: string[] = [
        SIGNPERSONCOLUMN.bucket_name,
        SIGNPERSONCOLUMN.bucket_id,
        SIGNPERSONCOLUMN.name,
        SIGNPERSONCOLUMN.chrcodemp
    ];

    const signPersonArr: (string | number)[][] = [];

    orgData.map((data) => {
        if (data.pPermit != null) {
            let bucketID: number | string = '';
            let chrcodemp: number | string = '';

            //FIND GROUP ID FOR BUCKET ID
            for (let i = 0; i < groupData.length; i++) {
                if (data.doc === groupData[i].groupName) {
                    bucketID = groupData[i].groupID ?? '';
                    i = groupData.length;
                }
            }

            //FIND USER ID FROM USERINFO FOR CHRCODEMP
            for (let j = 0; j < userData.length; j++) {
                if (data.pPermit === userData[j].empInfo) {
                    chrcodemp = userData[j].chrcodemp2 ?? '';
                    j = userData.length;
                }
            }

            signPersonArr.push([
                data.doc,
                bucketID,
                data.pPermit,
                chrcodemp
            ]);
        }
    });

    signPersonArr.splice(0, 0, columnName);

    return signPersonArr;
}
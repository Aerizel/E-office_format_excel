import { PERMISSIONCOLUMN } from "../../config/format_sheet_config";
import { groupModel } from "../../models/formatExcel/group_model";
import { orgModel } from "../../models/formatExcel/organize_structure_model";
import { newUserInfoModel } from "../../models/formatExcel/user_info";

export default function FormatPermission(orgData: orgModel[], groupData: groupModel[], userData: newUserInfoModel[]) {
    const columnName: string[] = [
        PERMISSIONCOLUMN.bucketName,
        PERMISSIONCOLUMN.bucketID,
        PERMISSIONCOLUMN.name,
        PERMISSIONCOLUMN.chrcodemp
    ]

    const pmitData: (string | number)[][] = [];

    orgData.map((data) => {
        if (data.pCommit != null) {
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
                if (data.pCommit === userData[j].empInfo) {
                    chrcodemp = userData[j].chrcodemp2 ?? '';
                    j = userData.length;
                }
            }

            if (data.type == 1) {
                for (let i = 0; i < 2; i++) {
                    pmitData.push([
                        data.doc,
                        bucketID,
                        data.pCommit,
                        chrcodemp
                    ]);
                }
            } else {
                pmitData.push([
                    data.doc,
                    bucketID,
                    data.pCommit,
                    chrcodemp
                ]);
            }
        }
    });

    pmitData.splice(0, 0, columnName);

    return pmitData;
}
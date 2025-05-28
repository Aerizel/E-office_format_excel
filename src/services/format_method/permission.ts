import { PERMISSION_COLUMN } from "../../config/format_sheet_config";
import { bucket_model } from "../../models/formatExcel/bucket_model";
import { groupModel } from "../../models/formatExcel/group_model";
import { orgModel } from "../../models/formatExcel/organize_structure_model";
import { newUserInfoModel } from "../../models/formatExcel/user_info";

export default function FormatPermission(orgData: orgModel[], bucketData: bucket_model[], userData: newUserInfoModel[]) {
    const columnName: string[] = [
        PERMISSION_COLUMN.bucketName,
        PERMISSION_COLUMN.bucketID,
        PERMISSION_COLUMN.name,
        PERMISSION_COLUMN.chrcodemp
    ];

    const pmitData: (string | number)[][] = [];

    bucketData.map((data) => {
        //FIND AFFILIATION FROM ORGANIZE DATA THAT HAVE COMMIT PERSON
        const index = orgData.findIndex(org => org.doc == data.bucket_name);
        let pCommit: string | null = null;

        if (index != -1) {
            pCommit = orgData[index].pCommit;
        }

        //CHECK IF IT HAVE COMMIT PERSON
        if (pCommit != null) {
            let chrcodemp: number | string = '';

            //FIND USER ID FROM USERINFO FOR CHRCODEMP
            for (let j = 0; j < userData.length; j++) {
                if (pCommit === userData[j].empInfo) {
                    chrcodemp = userData[j].chrcodemp2 ?? '';
                    j = userData.length;
                }
            }

            pmitData.push([
                data.bucket_name,
                data.bucket_id,
                pCommit,
                chrcodemp
            ]);
        }
    });

    pmitData.splice(0, 0, columnName);

    return pmitData;
}
import { SIGN_PERSON_COLUMN } from "../../config/format_sheet_config";
import { bucket_model } from "../../models/formatExcel/bucket_model";
import { groupModel } from "../../models/formatExcel/group_model";
import { orgModel } from "../../models/formatExcel/organize_structure_model";
import { newUserInfoModel } from "../../models/formatExcel/user_info";

export default function FormatSignPerson(orgData: orgModel[], bucketData: bucket_model[], userData: newUserInfoModel[]): (string | number)[][] {
    const columnName: string[] = [
        SIGN_PERSON_COLUMN.bucket_name,
        SIGN_PERSON_COLUMN.bucket_id,
        SIGN_PERSON_COLUMN.name,
        SIGN_PERSON_COLUMN.chrcodemp
    ];

    const signPersonArr: (string | number)[][] = [];

    bucketData.map((data) => {
        //FIND AFFILIATION FROM ORGANIZE DATA THAT HAVE COMMIT PERSON
        const index = orgData.findIndex(org => org.doc == data.bucket_name);
        let pPermit: string | null = null;
        let chrcodemp: number | string = '';

        if (index != -1) {
            pPermit = orgData[index].pPermit;
        }

        //CHECK IF IT HAVE PERMIT PERSON
        if (pPermit != null) {

            //FIND USER ID FROM USERINFO FOR CHRCODEMP
            for (let j = 0; j < userData.length; j++) {
                if (pPermit === userData[j].empInfo) {
                    chrcodemp = userData[j].chrcodemp2 ?? '';
                    j = userData.length;
                }
            }

            signPersonArr.push([
                data.bucket_name,
                data.bucket_id,
                pPermit ?? '',
                chrcodemp
            ]);
        }
    });

    signPersonArr.splice(0, 0, columnName);

    return signPersonArr;
}
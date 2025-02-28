import { NEW_USERINFO_COLUMN, OLD_USERINFO_COLUMN, OLD_USERINFO_SHEET_COLUMN_AMOUNT, START_USERINFO_CODE } from "../../config/format_sheet_config";
import { orgModel } from "../../models/formatExcel/organize_structure_model";
import { newUserInfoModel, oldUserInfoModel } from "../../models/formatExcel/user_info";

export function UserInfoToModel(sheetData: any): oldUserInfoModel[] {
    const orgStr = JSON.stringify(sheetData);
    const userObj: Record<string, any>[] = JSON.parse(orgStr);
    const entries = Object.entries(userObj[0]); //USE ONLY ONE ROW OF OBJECT JUST FOR COLUMN

    let userInfo: oldUserInfoModel[] = [];
    let arr_index: number[] = [];
    let index_check: number = 0;
    let out_of_loop: boolean = false;

    //CHECK COLUMN NAME IF IS MATCH OR NOT IF MATCH THEN STORE INDEX OF THAT COLUMN
    while (index_check < OLD_USERINFO_SHEET_COLUMN_AMOUNT && !out_of_loop) {
        let i: number = 0;
        let found_index: boolean = false;

        while (i < entries.length && i != -1) {
            const [key, value] = entries[i]; //GET ONLY COLUMN NAME OUT
            const oldColName = key.replace(/[\r\n ]+/g, '').replace(/\*.*$/, '');
            if (oldColName.includes(OLD_USERINFO_COLUMN[index_check])) {
                arr_index.push(i);
                index_check++;
                found_index = true;
                i = -1;
            }
            i++;
        }

        out_of_loop = found_index ? false : true;
    }

    //CHECK ALL NECESSARY COLUMN AMOUNT THAT HAVE ALL OF THEM OR NOT 
    const status = arr_index.length == OLD_USERINFO_SHEET_COLUMN_AMOUNT ? true : false;

    //IF SHEET HAVE ALL REQUIRE COLUMN THEN STORE VALUE
    if (status) {
        for (var data of userObj) {
            //GET ONE ROW OF DATA FOR EACH COLUMN
            const userInfoArr = Object.entries(data).map(([key, value]) => {
                return value;
            });

            //CHECK IF VALUE OF ROW IN THAT COLUMN IS NULL OR NOT
            if (userInfoArr[arr_index[0]] && userInfoArr[arr_index[1]] && userInfoArr[arr_index[2]] && userInfoArr[arr_index[3]] && userInfoArr[arr_index[4]] && userInfoArr[arr_index[5]]) {
                //INSERT ONE ROW OF DATA INTO NEW ARRAY STRUCTURE
                const userData: oldUserInfoModel = {
                    thaiPrefix: userInfoArr[arr_index[0]],
                    thaiName: userInfoArr[arr_index[1]],
                    thaiSurname: userInfoArr[arr_index[2]],
                    engPrefix: userInfoArr[arr_index[3]],
                    engName: userInfoArr[arr_index[4]],
                    engSurname: userInfoArr[arr_index[5]],
                    nickname: userInfoArr[arr_index[6]],
                    officePhone: userInfoArr[arr_index[7]],
                    email: userInfoArr[arr_index[8]],
                    role: userInfoArr[arr_index[9]],
                    officeName: userInfoArr[arr_index[10]],
                    username: userInfoArr[arr_index[11]],
                    empInfo: userInfoArr[arr_index[12]],
                }

                userInfo.push(userData);
            }
        }
    }
    return userInfo;
}

export function FormatUserInfo(affName: string, sheetData: oldUserInfoModel[], orgData: orgModel[]): [newUserInfoModel[], (string | number)[][]] {
    if (sheetData.length, orgData.length) {
        let chrcodemp2 = START_USERINFO_CODE - 1;

        const userInfoColumn: string[] = [
            NEW_USERINFO_COLUMN.thaiPrefix,
            NEW_USERINFO_COLUMN.thaiName,
            NEW_USERINFO_COLUMN.thaiSurname,
            NEW_USERINFO_COLUMN.engPrefix,
            NEW_USERINFO_COLUMN.engName,
            NEW_USERINFO_COLUMN.engSurname,
            NEW_USERINFO_COLUMN.nickname,
            NEW_USERINFO_COLUMN.officePhone,
            NEW_USERINFO_COLUMN.email,
            NEW_USERINFO_COLUMN.role,
            NEW_USERINFO_COLUMN.affiliation1,
            NEW_USERINFO_COLUMN.affiliation2,
            NEW_USERINFO_COLUMN.affiliation3,
            NEW_USERINFO_COLUMN.chrcodemp1,
            NEW_USERINFO_COLUMN.username,
            NEW_USERINFO_COLUMN.empInfo,
            NEW_USERINFO_COLUMN.chrcodeemp2
        ];

        const userArr: (string | number)[][] = [];
        const userData: newUserInfoModel[] = [];

        sheetData.map((data) => {
            ++chrcodemp2;

            let chrcodemp1: number | string = '';

            let index = 0;
            while (orgData.length > index) {
                if (data.officeName === orgData[index].doc) {
                    chrcodemp1 = orgData[index].chcodemp ?? '';
                    index = orgData.length + 1;
                } else {
                    ++index;
                }
            }

            /*orgData.forEach((items) => {
                if (data.officeName === items.doc) {
                    chrcodemp1 = items.chcodemp ?? '';
                }
            });*/

            userData.push({
                thaiPrefix: data.thaiPrefix,
                thaiName: data.thaiName,
                thaiSurname: data.thaiSurname,
                engPrefix: data.engPrefix,
                engName: data.engName,
                engSurname: data.engSurname,
                nickname: data.nickname,
                officePhone: data.officePhone,
                email: data.email,
                role: data.role,
                affiliation1: affName,
                affiliation2: data.officeName,
                affiliation3: data.officeName,
                chrcodemp1: chrcodemp1,
                username: data.username,
                empInfo: data.empInfo,
                chrcodemp2: chrcodemp2
            });

            userArr.push([
                data.thaiPrefix,
                data.thaiName,
                data.thaiSurname,
                data.engPrefix,
                data.engName,
                data.engSurname,
                data.nickname,
                data.officePhone,
                data.email,
                data.role,
                affName,
                data.officeName,
                data.officeName,
                chrcodemp1,
                data.username,
                data.empInfo,
                chrcodemp2
            ]);

        });

        userArr.splice(0, 0, userInfoColumn);

        return [
            userData,
            userArr
        ];
    } else {
        return [[], []];
    }
}

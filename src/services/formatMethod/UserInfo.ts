import { NEWUSERINFOCOLUMN, STARTUSERINFOCODE } from "../../config/formatSheetConfig";
import { orgModel } from "../../models/formatExcel/OrganizeStructureModel";
import { oldUserInfoModel } from "../../models/formatExcel/UserInfo";

export function userInfoToModel(sheetData: any): oldUserInfoModel[] {
    const orgStr = JSON.stringify(sheetData);
    const userObj: Record<string, any>[] = JSON.parse(orgStr);
    let userInfo: oldUserInfoModel[] = [];

    for (var data of userObj) {
        const userInfoArr = Object.entries(data).map(([key, value]) => value.toString());

        const userData: oldUserInfoModel = {
            thaiPrefix: userInfoArr[0],
            thaiName: userInfoArr[1],
            thaiSurname: userInfoArr[2],
            engPrefix: userInfoArr[3],
            engName: userInfoArr[4],
            engSurname: userInfoArr[5],
            nickname: userInfoArr[6],
            officePhone: userInfoArr[7],
            email: userInfoArr[8],
            role: userInfoArr[9],
            officeName: userInfoArr[10],
            username: userInfoArr[11],
            empInfo: userInfoArr[12],
        }
        userInfo.push(userData);
    }

    return userInfo;
}

export function formatUserInfo(affName: string, sheetData: oldUserInfoModel[], orgData: orgModel[]): (string | number)[][] {
    if (sheetData.length, orgData.length) {
        let chrcodemp2 = STARTUSERINFOCODE - 1;

        const userInfoColumn: string[] = [
            NEWUSERINFOCOLUMN.thaiPrefix,
            NEWUSERINFOCOLUMN.thaiName,
            NEWUSERINFOCOLUMN.thaiSurname,
            NEWUSERINFOCOLUMN.engPrefix,
            NEWUSERINFOCOLUMN.engName,
            NEWUSERINFOCOLUMN.engSurname,
            NEWUSERINFOCOLUMN.nickname,
            NEWUSERINFOCOLUMN.officePhone,
            NEWUSERINFOCOLUMN.email,
            NEWUSERINFOCOLUMN.role,
            NEWUSERINFOCOLUMN.affiliation1,
            NEWUSERINFOCOLUMN.affiliation2,
            NEWUSERINFOCOLUMN.affiliation3,
            NEWUSERINFOCOLUMN.chrcodemp1,
            NEWUSERINFOCOLUMN.username,
            NEWUSERINFOCOLUMN.empInfo,
            NEWUSERINFOCOLUMN.chrcodeemp2
        ];

        const userInfoData: (string | number)[][] = []
        sheetData.map((data) => {
            ++chrcodemp2;

            let chrcodemp1: number | string = '';

            let index = 0;
            while(orgData.length > index) {
                if (data.officeName === orgData[index].doc) {
                    chrcodemp1 = orgData[index].chcodemp ?? '';
                    index =  orgData.length + 1;
                } else {
                    ++index;
                }
            }
            
            /*orgData.forEach((items) => {
                if (data.officeName === items.doc) {
                    chrcodemp1 = items.chcodemp ?? '';
                }
            });*/

            userInfoData.push([
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

        userInfoData.splice(0, 0, userInfoColumn);

        return userInfoData;
    } else {
        return [];
    }
}

type oldUserInfoModel = {
    thaiPrefix: string,
    thaiName: string,
    thaiSurname: string,
    engPrefix: string,
    engName: string,
    engSurname: string,
    nickname: string,
    officePhone: string,
    email: string,
    role: string,
    officeName: string,
    username: string,
    empInfo: string
}

type newUserInfoModel = {
    thaiPrefix: string,
    thaiName: string,
    thaiSurname: string,
    engPrefix: string,
    engName: string,
    engSurname: string,
    nickname: string,
    officePhone: string,
    email: string,
    role: string,
    affiliation1: string,
    affiliation2: string,
    affiliation3: string,
    chrcodemp1: number | string,
    username: string,
    empInfo: string,
    chrcodemp2: number,
}

export {
    oldUserInfoModel,
    newUserInfoModel
}
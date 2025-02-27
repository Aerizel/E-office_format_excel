import { group } from "console";

//=======[ORGANIZE STRUCTURE SHEET]=======//
export const OLD_ORG_SHEET_NAME = "โครงสร้างองค์กร";
export const OLD_ORG_COLUMN = {
    doc: "แฟ้มทะเบียนรับ - ส่งภายใน",
    doc2: "แฟ้มทะเบียนรับ - ส่งภายนอก",
    status: "__EMPTY",
    pCommit: "__EMPTY_1",
    pPermit: "__EMPTY_2"
}
export const NEW_ORG_SHEET_NAME = "โครงสร้างองค์กรlm";
export const NEW_ORG_COLUMN = {
    affiliation1: "สังกัดหน่วยงานลำดับ 1 สำนักงาน/ชื่อหน่วยงาน",
    affiliation2: "สังกัดหน่วยงานลำดับ 2 กอง/ศูนย์/สำนัก",
    affiliation3: "สังกัดหน่วยงานลำดับ 3 กลุ่ม/ฝ่าย",
    chrcodemp:"chrcodemp"
}
export const START_ORG_CODE = 3001
//=======[GROUP SHEET]=======//
export const GROUP_SHEET_NAME = "Group";
export const GROUP_COLUMN = {
    groupName: "Group name",
    groupID: "Group ID",
    groupRoot: "Group Root"
}
//=======[GROUP SHEET]=======//
export const OLD_USERINFO_SHEET_NAME = "ข้อมูลผู้ใช้งาน";
export const NEW_USERINFO_SHEET_NAME = "ข้อมูลผู้ใช้งานlm";
export const OLD_USERINFO_SHEET_COLUMN_AMOUNT = 13;
// export const OLD_USERINFO_COLUMN = {
//     thaiPrefix: "คำนำหน้า(ภาษาไทย)",
//     thaiName: "ชื่อ(ภาษาไทย)",
//     thaiSurname: "นามสกุล(ภาษาไทย)",
//     engPrefix: "คำนำหน้า(ภาษาอังกฤษ)",
//     engName: "ชื่อ(ภาษาอังกฤษ)",
//     engSurname: "นามสกุล(ภาษาอังกฤษ)",
//     nickname: "ชื่อเล่น",
//     officePhone: "เบอร์โทรศัพท์สำนักงาน",
//     email: "E-mail",
//     role: "ตำแหน่ง",
//     group: "กอง/สำนัก/ศูนย์",
//     username: "Username",
//     empInfo: "ข้อมูลสำหรับเจ้าหน้าที่ระบบ"
// };
export const OLD_USERINFO_COLUMN = [
    'คำนำหน้า(ภาษาไทย)',
    'ชื่อ(ภาษาไทย)',
    'นามสกุล(ภาษาไทย)',
    'คำนำหน้า(ภาษาอังกฤษ)',
    'ชื่อ(ภาษาอังกฤษ)',
    'นามสกุล(ภาษาอังกฤษ)',
    'ชื่อเล่น',
    'เบอร์โทรศัพท์สำนักงาน',
    'E-mail',
    'ตำแหน่ง',
    'กอง/สำนัก/ศูนย์',
    'Username',
    'ข้อมูลสำหรับเจ้าหน้าที่ระบบ'
]

export const NEW_USERINFO_COLUMN = {
    thaiPrefix: "คำนำหน้า(ภาษาไทย)",
    thaiName: "ชื่อ(ภาษาไทย)",
    thaiSurname: "นามสกุล(ภาษาไทย)",
    engPrefix: "คำนำหน้า(ภาษาอังกฤษ)",
    engName: "ชื่อ(ภาษาอังกฤษ)",
    engSurname: "นามสกุล(ภาษาอังกฤษ)",
    nickname: "ชื่อเล่น",
    officePhone: "เบอร์โทรศัพท์สำนักงาน",
    email: "E-mail",
    role: "ตำแหน่ง",
    affiliation1: "สังกัดหน่วยงานลำดับ 1 สำนักงาน/ชื่อหน่วยงาน",
    affiliation2: "สังกัดหน่วยงานลำดับ 2 กอง/สำนัก/ศูนย์",
    affiliation3: "สังกัดหน่วยงานลำดับ 3 กลุ่ม/ฝ่าย",
    chrcodemp1: "chrcodemp",
    username: "Username",
    empInfo: "ข้อมูลสำหรับเจ้าหน้าที่ระบบ",
    chrcodeemp2: "chrcodemp",
};
export const START_USERINFO_CODE = 1001
//=======[BUCKET SHEET]=======//
export const NEW_BUCKET_SHEET_NAME = "Bucket";
export const BUCKET_COLUMN = {
    groupName: "Group_name",
    groupID: "Group_ID",
    bucketName: "Bucket_name",
    bucketID: "Bucket_id",
    type: "type",
    category: "category",
    runCode: "run code",
}
export const BUCKET_RUNCODE = "%r1%";
//=======[PERMISSION SHEET]=======//
export const NEW_PERMISSION_SHEET_NAME = "permission";
export const PERMISSION_COLUMN = {
    bucketName: "bucket_name",
    bucketID: "bucket_id",
    name: "ชื่อ-สกุล",
    chrcodemp: "chrcodemp",
}
//=======[SIGN-PERSON]=======//
export const NEW_SIGN_PERSON_SHEET_NAME = "sign-person";
export const SIGN_PERSON_COLUMN = {
    bucket_name: "bucket_name",
    bucket_id: "bucket_id",
    name: "ชื่อ-นามสกุล",
    chrcodemp: "chrcodemp",
}

//=======[SHEET REBEL NAME FOR SEARCH]=======//
export const SHEETREBEL = [
    OLD_ORG_SHEET_NAME,
    OLD_USERINFO_SHEET_NAME
]




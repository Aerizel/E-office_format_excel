//=======[ORGANIZE STRUCTURE SHEET]=======//
export const OLDORGSHEETNAME = "โครงสร้างองค์กร";
export const OLDORGCOLUMN = {
    doc: "แฟ้มทะเบียนรับ - ส่งภายใน",
    doc2: "แฟ้มทะเบียนรับ - ส่งภายนอก",
    status: "__EMPTY",
    pCommit: "__EMPTY_1",
    pPermit: "__EMPTY_2"
}
export const NEWORGSHEETNAME = "โครงสร้างองค์กรlm";
export const NEWORGCOLUMN = {
    affiliation1: "สังกัดหน่วยงานลำดับ 1 สำนักงาน/ชื่อหน่วยงาน",
    affiliation2: "สังกัดหน่วยงานลำดับ 2 กอง/ศูนย์/สำนัก",
    affiliation3: "สังกัดหน่วยงานลำดับ 3 กลุ่ม/ฝ่าย",
    chrcodemp:"chrcodemp"
}
export const STARTORGCODE = 3001
//=======[GROUP SHEET]=======//
export const GROUPSHEETNAME = "Group";
export const GROUPCOLUMN = {
    groupName: "Group name",
    groupID: "Group ID",
    groupRoot: "Group Root"
}
//=======[GROUP SHEET]=======//
export const OLDUSERINFOSHEETNAME = "ข้อมูลผู้ใช้งาน";
export const NEWUSERINFOSHEETNAME = "ข้อมูลผู้ใช้งานlm";
export const NEWUSERINFOCOLUMN = {
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
export const STARTUSERINFOCODE = 1001
//=======[BUCKET SHEET]=======//
export const NEWBUCKETSHEETNAME = "Bucket";
export const BUCKETCOLUMN = {
    groupName: "Group_name",
    groupID: "Group_ID",
    bucketName: "Bucket_name",
    bucketID: "Bucket_id",
    type: "type",
    category: "category",
    runCode: "run code",
}
export const BUCKETRUNCODE = "%r1%";
//=======[PERMISSION SHEET]=======//
export const NEWPERMISSIONSHEETNAME = "permission";
export const PERMISSIONCOLUMN = {
    bucketName: "bucket_name",
    bucketID: "bucket_id",
    name: "ชื่อ-สกุล",
    chrcodemp: "chrcodemp",
}
//=======[SIGN-PERSON]=======//
export const NEWSIGNPERSONSHEETNAME = "sign-person";
export const SIGNPERSONCOLUMN = {
    bucket_name: "bucket_name",
    bucket_id: "bucket_id",
    name: "ชื่อ-นามสกุล",
    chrcodemp: "chrcodemp",
}

//=======[SHEET REBEL NAME FOR SEARCH]=======//
export const SHEETREBEL = [
    OLDORGSHEETNAME,
    OLDUSERINFOSHEETNAME
]




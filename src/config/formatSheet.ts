//=======[ORGANIZE STRUCTURE SHEET]=======//
const OLDORGSHEETNAME = "โครงสร้างองค์กร";
const OLDORGCOLUMN = [
    "แฟ้มทะเบียนรับ - ส่งภายใน",
    "__EMPTY",
    "__EMPTY_1",
    "__EMPTY_2"
]
const NEWORGSHEETNAME = "โครงสร้างองค์กรlm";
const NEWORGCOLUMN = [
    "สังกัดหน่วยงานลำดับ 1 สำนักงาน/ชื่อหน่วยงาน",
    "สังกัดหน่วยงานลำดับ 2 กอง/ศูนย์/สำนัก",
    "สังกัดหน่วยงานลำดับ 3 กลุ่ม/ฝ่าย",
    "chrcodemp"
]
const STARTORGCODE = 3001

//=======[SHEET REBEL NAME FOR SEARCH]=======//
const SHEETREBEL = [
    OLDORGSHEETNAME,
]
export {
    SHEETREBEL,
    OLDORGCOLUMN,
    NEWORGSHEETNAME,
    NEWORGCOLUMN,
    STARTORGCODE
}



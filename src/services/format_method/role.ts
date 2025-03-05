import { ROLE_COLUMN, ROLE_KEY_START } from "../../config/format_sheet_config";
import { roleModel } from "../../models/formatExcel/role_model";
import { oldUserInfoModel } from "../../models/formatExcel/user_info";

export function GenerateRoleKey(userInfo: oldUserInfoModel[]): roleModel[] {
    //GET UNIQUE ROLE NAME
    const uniqueRoleName = Array.from(
        new Map(userInfo.map((data) => [data.role, data.role])).values()
    );

    //ADD ROLE KEY TO EACH ROLE NAME
    const roleData: roleModel[] = uniqueRoleName.map((role, index) => ({
        name: role,
        key: ROLE_KEY_START + index
    }));

    return roleData;
}

export default function FormatRole(roleData: roleModel[]): (string | number)[][] {
    const roleColumn: string[] = [
        ROLE_COLUMN.roleName,
        ROLE_COLUMN.roleKey
    ];

    const roleArr = roleData.map((role) => ([
        role.name,
        role.key
    ]));

    roleArr.splice(0, 0, roleColumn);

    return roleArr;
}
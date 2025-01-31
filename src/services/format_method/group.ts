import { GROUPCOLUMN } from "../../config/format_sheet_config";
import { groupModel } from "../../models/formatExcel/group_model";
import { orgModel } from "../../models/formatExcel/organize_structure_model";

export function GroupToJson(orgData: orgModel[], aff1Name: string): groupModel[] {
    if (orgData.length) {
        const firstIndex: groupModel = {
            groupName: aff1Name,
            groupID: 1,
            groupRoot: 'null'
        };

        const groupData: groupModel[] = orgData.map((data, index) => ({
            groupName: data.doc,
            groupID: index + 2,
            groupRoot: 1
        }));

        groupData.splice(0, 0, firstIndex);

        return groupData;
    } else {
        return []
    }
}

export function GroupFormat(groupData: groupModel[]): (string | number)[][] {
    if (groupData.length) {
        const groupColumn: string[] = [GROUPCOLUMN.groupName, GROUPCOLUMN.groupID, GROUPCOLUMN.groupRoot];

        const groupFormatData: (string | number)[][] = groupData.map((data) => (
            [data.groupName, data.groupID, data.groupRoot]
        ));

        groupFormatData.splice(0, 0, groupColumn);

        return groupFormatData;
    } else {
        return [];
    }

}
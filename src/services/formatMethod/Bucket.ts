import { BUCKETCOLUMN, BUCKETRUNCODE } from "../../config/formatSheetConfig";
import { groupModel } from "../../models/formatExcel/GroupModel";
import { orgModel } from "../../models/formatExcel/OrganizeStructureModel";

export function formatBucket(orgData: orgModel[], groupData: groupModel[]): (string | number)[][] {
    const columnName: string[] = [
        BUCKETCOLUMN.groupName,
        BUCKETCOLUMN.groupID,
        BUCKETCOLUMN.bucketName,
        BUCKETCOLUMN.bucketID,
        BUCKETCOLUMN.type,
        BUCKETCOLUMN.category,
        BUCKETCOLUMN.runCode
    ]

    const bucketData: (string | number)[][] = [];
    let bucketIndex: number = 1;

    orgData.map((data, index) => {
        let groupID: number | string = '';

        let findIndex = 0;
        while (groupData.length > findIndex) {
            if (data.doc === groupData[findIndex].groupName) {
                groupID = groupData[findIndex].groupID ?? '';
                findIndex = orgData.length + 1;
            } else {
                ++findIndex;
            }
        }

        if(data.type == 1) {
            for (let i = 2; i < 4; i++) {
                bucketData.push([
                    data.doc,
                    groupID,
                    data.doc,
                    bucketIndex,
                    data.type,
                    i,
                    BUCKETRUNCODE
                ]);
                bucketIndex++;
            }
        } else {
            bucketData.push([
                data.doc,
                groupID,
                data.doc,
                bucketIndex,
                data.type,
                index%2 ? 3 : 2,
                BUCKETRUNCODE
            ]);
            bucketIndex++;
        }
    });

    bucketData.splice(0, 0, columnName);

    return bucketData;
}
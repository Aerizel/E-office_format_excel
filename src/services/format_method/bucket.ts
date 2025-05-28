import { BUCKET_COLUMN, BUCKET_RUNCODE } from "../../config/format_sheet_config";
import { bucket_model } from "../../models/formatExcel/bucket_model";
import { groupModel } from "../../models/formatExcel/group_model";
import { orgModel } from "../../models/formatExcel/organize_structure_model";

export function FormatBucket(orgData: orgModel[], groupData: groupModel[]): [(string | number)[][], bucket_model[]] {
    const columnName: string[] = [
        BUCKET_COLUMN.groupName,
        BUCKET_COLUMN.groupID,
        BUCKET_COLUMN.bucketName,
        BUCKET_COLUMN.bucketID,
        BUCKET_COLUMN.type,
        BUCKET_COLUMN.category,
        BUCKET_COLUMN.runCode
    ]

    const bucketData: (string | number)[][] = [];
    const bucketJson: bucket_model[] = [];
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

        if (data.type == 1) {
            for (let i = 2; i < 4; i++) {
                bucketJson.push({
                    group_name: data.doc,
                    group_id: groupID,
                    bucket_name: data.doc,
                    bucket_id: bucketIndex,
                    type: data.type,
                    category: i,
                    run_code: BUCKET_RUNCODE
                });

                bucketData.push([
                    data.doc,
                    groupID,
                    data.doc,
                    bucketIndex,
                    data.type,
                    i,
                    BUCKET_RUNCODE
                ]);
                bucketIndex++;
            }
        } else {
            bucketJson.push({
                group_name: data.doc,
                group_id: groupID,
                bucket_name: data.doc,
                bucket_id: bucketIndex,
                type: data.type,
                category: index % 2 ? 3 : 2,
                run_code: BUCKET_RUNCODE
            });

            bucketData.push([
                data.doc,
                groupID,
                data.doc,
                bucketIndex,
                data.type,
                index % 2 ? 3 : 2,
                BUCKET_RUNCODE
            ]);
            bucketIndex++;
        }
    });

    bucketData.splice(0, 0, columnName);

    return [bucketData, bucketJson];
}
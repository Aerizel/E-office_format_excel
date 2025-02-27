export interface fileStatusModel {
    name: string,
    orgName: string,
    fail_log: string,
    status: "pending" | "in process" | "success" | "failed";
}
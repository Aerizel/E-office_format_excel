export interface fileStatusModel {
    name: string,
    status: "pending" | "in process" | "success" | "failed";
}
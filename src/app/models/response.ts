import { Category } from "./category";

export interface Response {
    status: number,
    message: string,
    result: Category[],
    args: any,
    timestamp: number,
}

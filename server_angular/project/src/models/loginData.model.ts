import { User } from "./user.model";

export class Data {
    constructor(
        public data: User,
        public errorMessage: string,
        public statusCode: number
    ) { }
}
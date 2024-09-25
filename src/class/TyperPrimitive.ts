import { type TyperBase } from "../types/types.ts";

export class TyperPrimitive<T extends (readonly any[] | null)> implements TyperBase {
    //@ts-expect-error
    type: string;
    list: T;
    constructor(list: T) {
        this.list = list;
    }

    check(value: any): boolean {
        if(typeof(value) !== this.type){
            return false;
        }

        if (this.list && !this.list.includes(value)) {
            return false;
        }

        return true;
    }
}
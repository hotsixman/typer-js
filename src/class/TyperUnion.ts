import { TyperObject } from "./TyperObject.js";
import { TyperPrimitive } from "./TyperPrimitive.js";

export class TyperUnion<T extends readonly (TyperPrimitive<any>|TyperObject<any>)[]> extends TyperPrimitive<T> {
    readonly type = "union";

    check(value: any): boolean {
        for (let j = 0; j < this.list.length; j++) {
            if (this.list[j].check(value)) {
                return true;
            }
        }

        return false;
    }
}
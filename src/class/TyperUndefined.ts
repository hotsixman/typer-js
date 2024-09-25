import { TyperPrimitive } from "./TyperPrimitive.js";

export class TyperUndefined extends TyperPrimitive<null>{
    readonly type = "undefined";

    constructor(){
        super(null);
    }
}
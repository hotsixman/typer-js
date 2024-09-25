import { TyperPrimitive } from "./TyperPrimitive.js";

export class TyperNull extends TyperPrimitive<null>{
    readonly type = "null";

    constructor(){
        super(null);
    }
}
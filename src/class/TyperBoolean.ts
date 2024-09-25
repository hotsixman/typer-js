import { TyperPrimitive } from "./TyperPrimitive.js";

export class TyperBoolean<T extends (readonly boolean[] | null)> extends TyperPrimitive<T>{
    readonly type = "boolean"
}
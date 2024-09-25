import { TyperPrimitive } from "./TyperPrimitive.js";

export class TyperString<T extends ((readonly string[]) | null)> extends TyperPrimitive<T>{
    readonly type = "string";
}
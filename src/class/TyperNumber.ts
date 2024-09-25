import { TyperPrimitive } from "./TyperPrimitive.js";

export class TyperNumber<T extends (readonly number[] | null)> extends TyperPrimitive<T>{
    readonly type = "number";
}
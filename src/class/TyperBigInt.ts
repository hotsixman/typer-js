import { TyperPrimitive } from "./TyperPrimitive.js";

export class TyperBigInt<T extends readonly bigint[] | null> extends TyperPrimitive<T>{
    readonly type = "bigint";
}
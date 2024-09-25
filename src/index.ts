import { TyperArray } from "./class/TyperArray.js";
import { TyperBigInt } from "./class/TyperBigInt.js";
import { TyperBoolean } from "./class/TyperBoolean.js";
import { TyperNull } from "./class/TyperNull.js";
import { TyperNumber } from "./class/TyperNumber.js";
import { TyperObject } from "./class/TyperObject.js";
import { TyperString } from "./class/TyperString.js";
import { TyperUnion } from "./class/TyperUnion.js";
import { TyperUndefined } from './class/TyperUndefined.js';
export type { TyperToType } from "./types/types.js";

export const typer = {
    Array: TyperArray,
    BigInt: TyperBigInt,
    Boolean: TyperBoolean,
    Null: TyperNull,
    Number: TyperNumber,
    Object: TyperObject,
    String: TyperString,
    Union: TyperUnion,
    Undefined: TyperUndefined
};

export default typer;
import { TyperArray } from "../class/TyperArray.js";
import { TyperBigInt } from "../class/TyperBigInt.js";
import { TyperBoolean } from "../class/TyperBoolean.js";
import { TyperNull } from "../class/TyperNull.js";
import { TyperNumber } from "../class/TyperNumber.js";
import { TyperObject } from "../class/TyperObject.js";
import { TyperPrimitive } from "../class/TyperPrimitive.js";
import { TyperString } from "../class/TyperString.js";
import { TyperUnion } from "../class/TyperUnion.js";
import { TyperUndefined } from "../class/TyperUndefined.js";

export interface TyperBase{
    check(value: any): boolean;
}

export interface TyperObjectOption{
    readonly [key: string]: TyperPrimitive<any> | TyperObject<any>;
}

export type TyperToType<T extends TyperBase> =  
    T extends TyperString<readonly string[] | null> ? 
        T['list'] extends readonly string[] ? T['list'][number] : string
    : T extends TyperNumber<readonly number[] | null> ?
        T['list'] extends readonly number[] ? T['list'][number] : number
    : T extends TyperBoolean<readonly boolean[] | null> ?
        T['list'] extends readonly boolean[] ? T['list'][number] : boolean
    : T extends TyperBigInt<readonly bigint[] | null> ?
        T['list'] extends readonly bigint[] ? T['list'][number] : bigint
    : T extends TyperNull ? null
    : T extends TyperArray<readonly (TyperPrimitive<any>|TyperObject<any>)[] | null> ?
        T['list'] extends readonly (TyperPrimitive<any>|TyperObject<any>)[] ? TyperToType<T['list'][number]>[] : any[]
    : T extends TyperUnion<readonly (TyperPrimitive<any>|TyperObject<any>)[]> ? TyperToType<T['list'][number]>
    : T extends TyperObject<Readonly<TyperObjectOption>> ? {[K in keyof T['option']]: TyperToType<T['option'][K]>}
    : T extends TyperUndefined ? undefined
    : never
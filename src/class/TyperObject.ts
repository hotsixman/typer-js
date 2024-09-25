import { TyperBase, TyperObjectOption } from "../types/types.ts";

export class TyperObject<T extends Readonly<TyperObjectOption>> implements TyperBase{
    option: T;
    constructor(option: T){
        this.option = option;
    }

    check(value: any): boolean {
        if(typeof(value) !== "object"){
            return false;
        }

        const valueKeys = Object.keys(value);
        const optionKeys = Object.keys(this.option);

        if(valueKeys.length !== optionKeys.length){
            return false;
        }

        for(const valueKey of valueKeys){
            const optionValue = this.option?.[valueKey];
            if(typeof optionValue === "undefined"){
                return false;
            }

            if(!optionValue.check(value[valueKey])){
                return false;
            }
        }

        return true;
    }
}
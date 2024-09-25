import { TyperObject } from "./TyperObject.js";
import { TyperPrimitive } from "./TyperPrimitive.js";

export class TyperArray<T extends readonly (TyperPrimitive<any> | TyperObject<any>)[] | null> extends TyperPrimitive<T> {
    readonly type = "array";

    check(value: any[]): boolean {
        if(!Array.isArray(value)){
            return false;
        }

        if(!this.list){
            return true;
        }

        for(let i = 0; i < value.length; i++){
            let result: boolean = false;
            for(let j = 0; j < this.list.length; j++){
                if(this.list[j].check(value[i])){
                    result = true;
                    break;
                }
            }
            if(!result){
                return false;
            }
        }

        return true;
    }
}
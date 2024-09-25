# Typer

Typer can perform both TypeScript type checking and runtime type validation.

## Example

Let's assume we have the following code.

```ts
interface Children{
    name: string;
    age: number;
    gender: 'male' | 'female' | 'other';
}

interface ResponseData{
    name: string;
    age: number;
    gender: 'male' | 'female' | 'other';
    children: Children[];
}

const responseData: ResponseData = await response.json(); //It does not check if the actual type is correct.
```

To use this in Typer, you would write it as follows.

```ts
import typer, {type TyperToType } from 'typer';

const nameTyper = new typer.String(null);// Using `null` in constructor argument will only check if the value is `string`
const ageTyper = new typer.Number(null);
const genderTyper = new typer.String(['male', 'female', 'other'] as const);// You must use `as const` to check if the value is in specific values

const childrenTyper = new typer.Object({
    name: nameTyper,
    age: ageTyper,
    gender: genderTyper
});
const responseDataTyper = new typer.Object({
    name: nameTyper,
    age: ageTyper,
    gender: genderTyper,
    children: new typer.Array([childrenTyper] as const)
})

const responseData: TyperToType<typeof responseDataTyper> = await response.json(); //Typescript type checking.

if(!responseDataTyper.check(responseData)){// Runtime type checking.
    console.log('Runtime Type Error.')
}
```

## Typer Classes

### class `typer.String`

```ts
const stringTyper = new typer.String(null);// Use null to check if the value is string.
const a_or_b_Typer = new typer.String(["a", "b"] as const);// Check if the value is specific value.

stringTyper.check("hi"); //true
a_or_b_Typer.check("a"); //true
a_or_b_Typer.check("as"); //false
```

### class `typer.Number`

```ts
const numberTyper = new typer.Number(null);// Use null to check if the value is number.
const one_or_two = new typer.Number([1, 2] as const);// Check if the value is specific value.

numberTyper.check(283); //true
one_or_two.check(1); //true
one_or_two.check(12); //false
```

### class `typer.Boolean`

```ts
const booleanTyper = new typer.Boolean(null);// Use null to check if the value is boolean.
const trueTyper = new typer.Boolean([true] as const);// Check if the value is specific value.

booleanTyper.check(false); //true
trueTyper.check(true); //true
trueTyper.check(false); //false
```

### class `typer.BigInt`

```ts
const bigintTyper = new typer.BigInt(null);// Use null to check if the value is bigint.
const specificTyper = new typer.BigInt([1n, 10n, 192939192n] as const);// Check if the value is specific value.

bigintTyper.check(2n); //true
specificTyper.check(192939192n); //true
specificTyper.check(3n); //false
```

### class `typer.Null`

```ts
const nullTyper = new typer.Null();

nullTyper.check(null)//true
nullTyper.check(false)//false
```

### class `typer.Undefined`

```ts
const undefinedTyper = new typer.Undefined();

undefinedTyper.check(undefined); //true
undefinedTyper.check(void(1));//true
undefinedTyper.check(false);//false
```

### class `typer.Array`

```ts
const arrayTyper = new typer.Array(null);//Use null to check if the value is an array.
const specificTyper = new typer.Array([
    new typer.String(["asd", "qwe"] as const),
    new typer.Number(null)
] as const)

arrayTyper.check(["kasndksa"]); //true
specificTyper.check(["qwe", "asd", 123, 1232, "qwe"]); //true
specificTyper.check(["asd", 123, 1232, "qwes"]); //false
```

### class `typer.Union`

```ts
const unionTyper = new typer.Union([
    new typer.String(["asd", "qwe"] as const),
    new typer.Number(null)
] as const);

unionTyper.check("qwe"); //true
unionTyper.check(12312313); //true
unionTyper.check(true); //false
```

### class `typer.Object`

```ts
const objectTyper = new typer.Object({
    name: new typer.String(null),
    age: new typer.Number(null),
    gender: new typer.String(["male", "female"] as const);
});

objectTyper.check({
    name: 'kim',
    age: 10,
    gender: "male"
}) //true
objectTyper.check({
    name: 'kim',
    age: 10,
    gender: "hahaha"
}) //true
objectTyper.check({
    name: 'kim',
    age: 10,
    gender: "male",
    option: false
}) //false
objectTyper.check({
    name: 'kim',
    gender: "male"
}) //false
```

## type `TyperToType`

This type will change Typer Instance to Typescript type.

```ts
const objectTyper = new typer.Object({
    name: new typer.String(null),
    age: new typer.Number(null),
    gender: new typer.String(["male", "female"] as const);
});

type ExampleObject = TyperToTyper<typeof objectTyper>;//You must use `typeof`

/**
 * ExampleObject will be
 * {
 *  name: string;
 *  age: number;
 *  gender: 'male' | 'female';
 * } 
 */
const obj: ExampleObject = {
    name: 'kim',
    age: 20,
    gender: 'male'
}
```
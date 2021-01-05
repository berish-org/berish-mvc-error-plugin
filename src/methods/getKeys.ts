import LINQ from "@berish/linq";

export function getKeys(obj: any) {
  try {
    const dontEnums = [
      "toString",
      "toLocaleString",
      "valueOf",
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "constructor",
    ];
    let props: LINQ<string> = LINQ.from();

    do {
      props = props.concat(Object.getOwnPropertyNames(obj));
    } while ((obj = Object.getPrototypeOf(obj)) && obj !== Object.prototype);
    return props
      .orderByAscending((m) => m)
      .distinct()
      .except(dontEnums);
  } catch (e) {
    return LINQ.from(Object.keys(obj));
  }
}

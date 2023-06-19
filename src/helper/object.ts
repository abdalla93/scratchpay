export const getObjectKeyFromValue = (object, value) => Object.keys(object).find(key => object[key] === value);

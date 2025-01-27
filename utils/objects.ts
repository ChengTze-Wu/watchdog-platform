import { Key } from "react";

export const getNestedKeyValue = (obj: any, key: Key) => {
  const keys = String(key).split(".");
  return keys.reduce((acc, current) => {
    return acc[current];
  }, obj);
};

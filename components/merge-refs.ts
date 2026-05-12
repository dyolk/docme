import type { Ref } from "react";

export function mergeRefs<T>(...refs: Ref<T>[]) {
  return (value: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") ref(value);
      else if (ref) (ref as React.MutableRefObject<T | null>).current = value;
    });
  };
}

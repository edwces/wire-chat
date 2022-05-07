import { DependencyList, EffectCallback, useEffect, useRef } from "react";

export const useEffectOnce = (
  effect: EffectCallback,
  deps?: DependencyList
) => {
  const isMounted = useRef(false);
  const destructor = useRef<void | any>(null);

  useEffect(() => {
    // destructor is returned only second time
    // as component in react 18 is destroyed immediately
    if (isMounted.current) return destructor.current;

    isMounted.current = true;
    destructor.current = effect();
  }, deps);
};

import { useEffect, useRef } from "react";

export function useDebounce(cb: (value: string) => void, delay: number) {
  const timeoutRef =  useRef<ReturnType<typeof setTimeout> | null>(null);

  return (value: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      cb(value);
    }, delay);
  };
}

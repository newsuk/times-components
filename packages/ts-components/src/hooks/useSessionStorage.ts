import { useState, useEffect, useCallback } from 'react';

export type UseSessionStorage<T> = {
  value: T;
  setItem: (newValue: T) => void;
  getItem: () => T;
  removeItem: () => void;
};

export function useSessionStorage<T>(
  key: string,
  initialValue: T
): UseSessionStorage<T> {
  // Retrieve initial value from sessionStorage or use the provided initial value
  const getSessionValue = (): T => {
    const savedItem = sessionStorage.getItem(key);
    return savedItem ? JSON.parse(savedItem) : initialValue;
  };

  // State to store the current value
  const [value, setValue] = useState<T>(getSessionValue);

  // Function to update sessionStorage and state
  const setItem = useCallback(
    (newValue: T) => {
      setValue(newValue);
      sessionStorage.setItem(key, JSON.stringify(newValue));
    },
    [key]
  );

  // Function to get the current value from sessionStorage
  const getItem = useCallback(
    (): T => {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    },
    [key, initialValue]
  );

  // Function to remove the item from sessionStorage and reset state
  const removeItem = useCallback(
    () => {
      setValue(initialValue);
      sessionStorage.removeItem(key);
    },
    [key, initialValue]
  );

  // Sync the state with sessionStorage whenever the key changes
  useEffect(
    () => {
      setValue(getSessionValue());
    },
    [key]
  );

  return { value, setItem, getItem, removeItem };
}

export const debounce = <Args extends unknown[]>(
  fn: (...args: Args) => void,
  delay: number
) => {
  let timeoutID: any | undefined;

  const debounced = (...args: Args) => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      fn(...args);
    }, delay);
  };

  return debounced;
};

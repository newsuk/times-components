const debounce = (
  fn,
  delay
) => {
  let timeoutID;

  const debounced = (...args) => {
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
          fn(...args);
      }, delay);
  };

  return debounced;
};

export default debounce;
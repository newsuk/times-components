export default (uriString, key, value) => {
  if (!uriString || !key || !value) {
    return uriString;
  }

  if (uriString.includes(`?${key}`) || uriString.includes(`&${key}`)) {
    return uriString;
  }

  if (uriString.includes("?")) {
    return `${uriString}&${key}=${value}`;
  }

  return `${uriString}?${key}=${value}`;
};

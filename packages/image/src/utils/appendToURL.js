export default (uriString, key, value) => {
  if (!uriString || !key || !value) {
    return uriString;
  }

  if (uriString.includes(`?${key}`) || uriString.includes(`&${key}`)) {
    return uriString;
  }

  const separator = uriString.includes("?") ? "&" : "?";
  return `${uriString}${separator}${key}=${value}`;
};

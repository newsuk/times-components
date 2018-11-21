/* eslint-env browser */

export default (uriString, key, value) => {
  if (!uriString || !key || !value) {
    return uriString;
  }

  if (uriString.includes(`?${key}`) || uriString.includes(`&${key}`)) {
    return uriString;
  }

  if (typeof URL === "undefined") {
    const separator = uriString.includes("?") ? "&" : "?";
    return `${uriString}${separator}${key}=${value}`;
  }

  let url;

  try {
    url = new URL(uriString);
  } catch (e) {
    return uriString;
  }

  if (url.search) {
    return `${uriString}&${key}=${value}`;
  }

  return `${uriString}?${key}=${value}`;
};

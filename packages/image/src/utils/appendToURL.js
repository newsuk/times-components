/* eslint-env browser */

const appendUriString = (uriString, key, value) => {
  const separator = uriString.includes("?") ? "&" : "?";
  return `${uriString}${separator}${key}=${value}`;
};

export default (uriString, key, value) => {
  if (!uriString || !key || !value) {
    return uriString;
  }

  if (uriString.includes(`?${key}`) || uriString.includes(`&${key}`)) {
    return uriString;
  }

  if (typeof URL === "undefined") {
    return appendUriString(uriString, key, value);
  }

  let url;

  try {
    url = new URL(uriString);
  } catch (e) {
    return appendUriString(uriString, key, value);
  }

  if (url.search) {
    return `${uriString}&${key}=${value}`;
  }

  return `${uriString}?${key}=${value}`;
};

/* eslint-env browser */

export default (uriString, key, value) => {
  if (!uriString || !key || !value) {
    return uriString;
  }

  if (typeof URL === "undefined") {
    return `${uriString}&${key}=${value}`;
  }

  let url;

  try {
    url = new URL(uriString);
  } catch (e) {
    console.error("Invalid URL", uriString);
    return uriString;
  }

  if (url.search) {
    return `${uriString}&${key}=${value}`;
  }

  return `${uriString}?${key}=${value}`;
};

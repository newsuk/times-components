import Utils from "./appendToURL";

const appendParamsToQuery = (uriString, paramMap) => {
  if (!uriString || !paramMap) {
    return uriString;
  }

  let finalUri = uriString;

  paramMap.forEach((value, key) => {
    if (!(finalUri.includes(`?${key}`) || finalUri.includes(`&${key}`))) {
      const separator = finalUri.includes("?") ? "&" : "?";
      finalUri = `${finalUri}${separator}${key}=${value}`;
    }
  });

  return finalUri;
};

export default Utils;

export { appendParamsToQuery };

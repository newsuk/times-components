import Utils from "./appendToURL";

const appendParamsToQuery = (uriString, paramMap) => {
  if (!uriString || !paramMap) {
    return uriString;
  }

  let finalUri = uriString;

  paramMap.forEach(item => {
    if (
      !(
        (item && finalUri.includes(`?${item.name}`)) ||
        finalUri.includes(`&${item.name}`)
      )
    ) {
      const separator = finalUri.includes("?") ? "&" : "?";
      finalUri = `${finalUri}${separator}${item.name}=${item.value}`;
    }
  });

  return finalUri;
};

export default Utils;

export { appendParamsToQuery };

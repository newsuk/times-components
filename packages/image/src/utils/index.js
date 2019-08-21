import url from "url";
import Utils from "./appendToURL";

const appendParamsToQuery = (uriString, paramMap) => {
  if (!uriString || !paramMap) {
    return uriString;
  }

  const uri = url.parse(uriString, true);
  uri.search = undefined;
  uri.query = {
    ...uri.query,
    ...paramMap
  };
  return url.format(uri);
};

export default Utils;

export { appendParamsToQuery };

import url from "url";

const appendParamsToQuery = (uriString, paramMap) => {
  if (!uriString || !paramMap) {
    return uriString;
  }

  const uri = url.parse(uriString, true);
  uri.search = undefined;
  Object.assign(uri.query, paramMap);
  return url.format(uri);
};

export default appendParamsToQuery;

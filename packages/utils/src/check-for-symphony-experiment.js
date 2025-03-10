import getBase64CookieValue from "./get-base64-cookie-value";

const checkForSymphonyExperiment = () => {
  const zephrDecisions = getBase64CookieValue("nuk_zephr_decisions");
  if (!zephrDecisions || !zephrDecisions["free-access-symphony"]) {
    return false;
  }
  return zephrDecisions["free-access-symphony"].includes("ARTICLE_ACCESS");
};

export default checkForSymphonyExperiment;

import getBase64CookieValue from "./get-base64-cookie-value";

const checkForSymphonyExperiment = () => {
  const zephrDecisions = getBase64CookieValue("nuk_zephr_decisions");
  if (!zephrDecisions || !zephrDecisions["project-symphony"]) {
    return false;
  }
  return zephrDecisions["project-symphony"].includes("ARTICLE_ACCESS");
};

export default checkForSymphonyExperiment;

export const getCookieValue = cookieName => {
  const allCookies = document.cookie;
  const cookiesArray = allCookies.split(";");
  const targetCookie = cookiesArray.find(cookie => cookie.includes(cookieName));
  return targetCookie ? targetCookie.split("=")[1] : null;
};

export const getBase64CookieValue = cookieName => {
  const cookieValue = getCookieValue(cookieName);
  if (!cookieValue) return undefined;
  try {
    return JSON.parse(atob(cookieValue));
  } catch (e) {
    return undefined;
  }
};

export const checkForSymphonyExperiment = () => {
  const zephrDecisions = getBase64CookieValue("nuk_zephr_decisions");
  return !!zephrDecisions?.["project-symphony"]?.includes("ARTICLE_ACCESS");
};

import getCookieValue from "./get-cookie-value";

const getBase64CookieValue = cookieName => {
  const cookieValue = getCookieValue(cookieName);
  if (!cookieValue) return undefined;
  try {
    return JSON.parse(atob(cookieValue));
  } catch (e) {
    return undefined;
  }
};

export default getBase64CookieValue;

const getCookieValue = cookieName => {
  const allCookies = document.cookie;
  const cookiesArray = allCookies.split(";");
  const targetCookie = cookiesArray.find(cookie => cookie.includes(cookieName));
  return targetCookie ? targetCookie.split("=")[1] : null;
};

export default getCookieValue;

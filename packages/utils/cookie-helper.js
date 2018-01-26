/* global document */

/* eslint-disable import/prefer-default-export */

const cookieHelper = {};

/*
 * https://nidigitalsolutions.jira.com/wiki/display/ACS/Generate+Login+Cookie
 */
const CPN_ID_KEY = "eid";
const CIPS_KEY = "cips";
const VISITOR_ID_KEY = "v_id";

function decodeCookie(value) {
  try {
    return decodeURIComponent(value);
  } catch (e) {
    return null;
  }
}

function parseCookie(value, valueSeparator, paramSeparator) {
  const cookieValue = decodeCookie(value) || "";
  return cookieValue.split(valueSeparator).reduce((res, param) => {
    const parts = param.split(paramSeparator);
    res[parts[0]] = parts[1];
    return res;
  }, {});
}

function getCookieValue(name) {
  if (document.cookie) {
    const cookies = document.cookie.split(";").map(cookie => cookie.trim());
    const cookiesAndValues = cookies.map(cookie => cookie.split("="));
    const indexOfCookie = cookiesAndValues.findIndex(
      cookie => cookie[0] === name
    );
    const test = indexOfCookie > -1 ? cookiesAndValues[indexOfCookie][1] : null;
    return test;
  }
  return null;
}

/**
 * Extracts CPN ID from ACS login cookie
 *
 * @return {String|null}
 */
cookieHelper.getCpnId = () => {
  const cookie = parseCookie(getCookieValue("acs_tnl"), "&", "=");
  return cookie[CPN_ID_KEY] || null;
};

/**
 * Extracts Cips value from ACS login cookie
 *
 * @return {String|null}
 */
cookieHelper.getCips = () => {
  const cookie = parseCookie(getCookieValue("acs_tnl"), "&", "=");
  return cookie[CIPS_KEY] || null;
};

/**
 * Extracts getVistorId value from utag_main cookie
 *
 * @return {String|null}
 */
cookieHelper.getVistorId = () => {
  const cookie = parseCookie(getCookieValue("utag_main"), "$", ":");
  return cookie[VISITOR_ID_KEY] || null;
};

export { cookieHelper };
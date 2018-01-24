/*global document */
'use strict';

const cookieHelper = {};

/*
 * https://nidigitalsolutions.jira.com/wiki/display/ACS/Generate+Login+Cookie
 */
const CPN_ID_KEY = 'eid';
const CIPS_KEY = 'cips';
const VISITOR_ID_KEY = 'v_id';

function decodeCookie (value) {
    if (!value) {
        return;
    }

    try {
        return decodeURIComponent(value);
    } catch(e) {
        return;
    }
}

function parseCookie (value, valueSeparator, paramSeparator) {
    value = decodeCookie(value) || '';

    return value.split(valueSeparator).reduce((res, param) => {
        const parts = param.split(paramSeparator);
        res[parts[0]] = parts[1];
        return res;
    }, {});
}

/**
  * Sets a cookie with value
  *
  * @param name Name of cookie to be set
  * @param value Value of cookie to be set
  * @param days No of days to expire cookie in
*/
cookieHelper.setCookie = function (name, value, days) {
    if (!days) {
        throw new Error('setCookie: missing expiry param');
    }

    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = '; expires=' + date.toGMTString();
    document.cookie = name + '=' + value + expires + '; path=/';
};

cookieHelper.getCookieValue = function (name) {
    if (document.cookie) {
        const cookies = document.cookie.split(';').map(cookie => cookie.trim());
        const cookiesAndValues = cookies.map(cookie => cookie.split('='));
        const indexOfCookie = cookiesAndValues.findIndex(cookie => cookie[0] === name);
        const test = indexOfCookie > -1 ? cookiesAndValues[indexOfCookie][1] : null;
        return test;
    }
};

/**
 * Extracts CPN ID from ACS login cookie
 *
 * @return {String|null}
 */
cookieHelper.getCpnId = function (value) {
    const cookie = parseCookie(value, '&', '=');
    return cookie[CPN_ID_KEY] || null;
};

/**
 * Extracts Cips value from ACS login cookie
 *
 * @return {String|null}
 */
cookieHelper.getCips = function (value) {
    const cookie = parseCookie(value, '&', '=');
    return cookie[CIPS_KEY] || null;
};


/**
 * Extracts getVistorId value from utag_main cookie
 *
 * @return {String|null}
 */
cookieHelper.getVistorId = function (value) {
    const cookie = parseCookie(value, '$', ':');
    return cookie[VISITOR_ID_KEY] || null;
};

/**
 * Return object containing key value pairs
 *
 * @return {Object}
 */
cookieHelper.getKeyValuePairs = function (value) {
    return parseCookie(value, ':');
};

module.exports = cookieHelper;

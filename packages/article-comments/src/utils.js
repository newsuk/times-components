/* global fetch window */

import { STORE_URL_GB, STORE_URL_GLOBAL, STORE_URL_IE } from "./constants";

const storeURL = {
  gb: `${STORE_URL_GB}?ILC=GB-TNL_The_Times-Conversion_Page-Homepage-2020`,
  ie: `${STORE_URL_IE}?ILC=IE-TNL_The_Times-Conversion_Page-Homepage-2020`,
  global: `${STORE_URL_GLOBAL}?ILC=INTL-TNL_The_Times-Conversion_Page-Homepage-2020`
};

export const userShouldUpdateName = async username => {
  if (!username) {
    return false;
  }

  const url = `/api/comments/display-names-pseudonyms?username=${username}`;

  const checkUsername = fetch(url)
    .then(response => response.json())
    .then(data => data);

  const { isPseudonym } = await checkUsername;

  if (!isPseudonym) {
    return false;
  }

  return isPseudonym;
};

export const getDisplayNameFromLocalStorage = () => {
  const spotimUserDetails = window.localStorage.getItem("SPOTIM_CURRENT_USER");

  if (!spotimUserDetails) return false;

  const spotimUserDetailsJSON =
    spotimUserDetails && JSON.parse(spotimUserDetails);

  const { displayName } = spotimUserDetailsJSON.data;

  return displayName || false;
};

const parseCookie = cookie =>
  cookie.split("&").reduce((acc, param) => {
    const [key, value] = param.split("=");
    acc[key] = value;
    return acc;
  }, {});

export const getCpnId = cookie =>
  cookie ? parseCookie(cookie).eid : undefined;

export default () => {
  const region =
    // eslint-disable-next-line no-undef
    typeof window !== "undefined" && window.nuk && window.nuk.region;
  return storeURL[region] || storeURL.gb;
};

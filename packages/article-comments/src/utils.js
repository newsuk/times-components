/* global fetch window */

export const userShouldUpdateName = async (username) => {
  if (!username) {
    return false;
  }

  const url = `/api/comments/display-names-pseudonyms?username=${username}`;

  const checkUsername = fetch(url)
    .then((response) => response.json())
    .then((data) => data);

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

const parseCookie = (cookie) =>
  cookie.split("&").reduce((acc, param) => {
    const [key, value] = param.split("=");
    acc[key] = value;
    return acc;
  }, {});

export const getCpnId = (cookie) =>
  cookie ? parseCookie(cookie).eid : undefined;

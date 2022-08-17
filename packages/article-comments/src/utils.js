/* global fetch window */
const storeURL = {
  gb:
    "https://thetimes.co.uk/subscribe/digital?ILC=GB-TNL_The_Times-Conversion_Page-Homepage-2020",
  ie:
    "https://store.thetimes.ie/?ILC=IE-TNL_The_Times-Conversion_Page-Homepage-2020",
  global:
    "https://globalstore.thetimes.co.uk/?ILC=INTL-TNL_The_Times-Conversion_Page-Homepage-2020"
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

export const shouldReauthenticateUser = () => {
  console.log('***2 inside shouldReauthenticateUser***');
  const isUsingRealNameCommenting = window.localStorage.getItem(
    "isUsingRealNameCommenting"
  );
  console.log('***3 after looking for isUsingRealNameCommenting token***');
  if (isUsingRealNameCommenting) {
    console.log('***4A in isUsingRealNameCommenting exists branch***');
    console.log("***User has real name token***");
    console.log("***shouldReauthenticateUser returns false***");
    return false;
  }
  console.log('***4B in isUsingRealNameCommenting doesnt exist branch***');
  window.localStorage.removeItem("SPOTIM_DEVICE_V2");
  window.localStorage.removeItem("SPOTIM_CURRENT_USER");
  window.localStorage.removeItem("SPOTIM_ACCESS_TOKEN");
  window.localStorage.removeItem("SPOT_AB");
  window.localStorage.removeItem("SPOTIM_DEVICE_UUID_V2");
  console.log("***No real name token***");
  console.log("***SPOT tokens deleted***");
  console.log("***shouldReauthenticateUser returns true***");
  return true;
};

export const getDisplayNameFromLocalStorage = () => {
  const spotimUserDetails = window.localStorage.getItem("SPOTIM_CURRENT_USER");

  if (!spotimUserDetails) return false;

  const spotimUserDetailsJSON =
    spotimUserDetails && JSON.parse(spotimUserDetails);

  const { displayName } = spotimUserDetailsJSON.data;

  return displayName || false;
};

export default () => {
  const region =
    // eslint-disable-next-line no-undef
    typeof window !== "undefined" && window.nuk && window.nuk.region;
  return storeURL[region] || storeURL.gb;
};

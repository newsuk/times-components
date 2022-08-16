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

export const reauthenticateUser = () => {
  const realNameToken = window.localStorage.getItem('isUsingRealNameCommenting');
  if (realNameToken) {
    console.log('***There is a real name token***');
    return
      }
      window.localStorage.removeItem("SPOTIM_DEVICE_V2");
      window.localStorage.removeItem("SPOTIM_CURRENT_USER");
      window.localStorage.removeItem("SPOTIM_ACCESS_TOKEN");
      window.localStorage.removeItem("SPOT_AB");
      window.localStorage.removeItem("SPOTIM_DEVICE_UUID_V2");
};

export default () => {
  const region =
    // eslint-disable-next-line no-undef
    typeof window !== "undefined" && window.nuk && window.nuk.region;
  return storeURL[region] || storeURL.gb;
};

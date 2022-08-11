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

  const checkUsername = global
    .fetch(url)
    .then(response => response.json())
    .then(data => data);

  const isPseudonym = await checkUsername;

  if (!isPseudonym) {
    return false;
  }

  const bannerCount = global.window.localStorage.getItem(
    "realNameCommentingBannerViewCount"
  );
  const isBannerVisible = global.window.localStorage.getItem(
    "isRealNameCommentingBannerVisible"
  );
  const hasLocalStorageBeenSet = bannerCount && isBannerVisible;

  if (!hasLocalStorageBeenSet) {
    global.window.localStorage.setItem("realNameCommentingBannerViewCount", 3);
    global.window.localStorage.setItem(
      "isRealNameCommentingBannerVisible",
      false
    );
  }

  return bannerCount > 0;
};

export default () => {
  const region =
    // eslint-disable-next-line no-undef
    typeof window !== "undefined" && window.nuk && window.nuk.region;
  return storeURL[region] || storeURL.gb;
};

const parseCookie = (value, valueSeparator, paramSeparator) => {
  console.log("***value parse cookie***", value);
  value = decodeURIComponent(value)

  return value.split(valueSeparator).reduce((res, param) => {
      const parts = param.split(paramSeparator);
      res[parts[0]] = parts[1];
      return res;
  }, {});
};
  const getCpnId = value => {
    console.log("***value***", value);
    const cookie = parseCookie(value, '&', '=');
    console.log("***cookie ***", cookie );
    return cookie.eid || null;
};

export const reauthenticateUser = () => {
  const spotImAccessToken = global.window.localStorage.getItem('SPOTIM_ACCESS_TOKEN');
  const spotImDeviceUuid = global.window.localStorage.getItem('SPOTIM_DEVICE_UUID_V2');
  const spotAB = global.window.localStorage.getItem('SPOT_AB');
  const spotImDeviceV2 = global.window.localStorage.getItem('SPOTIM_DEVICE_V2');
  const spotImCurrentUser = global.window.localStorage.getItem('SPOTIM_CURRENT_USER');
  console.log("***1***");
  if (!spotImAccessToken) {
    console.log("***2***");
    return
  }
  console.log("***3***");
  // u_rAGPG2gW1OUB
  // u_sE9UoUYxWQ50
    const acsCookie = window.nuk.getCookieValue('acs_tnl')
    console.log("***acsCookie***", acsCookie);
    const cpn = getCpnId(acsCookie);
    console.log("***cpn***", cpn);
//?enableRealNameCommenting
};

document.addEventListener(
  "spot-im-user-auth-success", (event) => {

    const {displayName, email, id, username} = event.detail


    console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
    console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
    console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', event.detail)
    console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
    console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  },
);

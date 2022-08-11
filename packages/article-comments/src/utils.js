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

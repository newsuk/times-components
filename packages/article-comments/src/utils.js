const storeURL = {
  gb:
    "https://thetimes.co.uk/subscribe/digital?ILC=GB-TNL_The_Times-Conversion_Page-Homepage-2020",
  ie:
    "https://store.thetimes.ie/?ILC=IE-TNL_The_Times-Conversion_Page-Homepage-2020",
  global:
    "https://globalstore.thetimes.co.uk/?ILC=INTL-TNL_The_Times-Conversion_Page-Homepage-2020"
};

export const userShouldUpdateName = async username => {
  console.log('***1***')
  if (!username) {
    console.log('***2***')
    return false;
  }
  console.log('***3***')
  const url = `/api/comments/display-names-pseudonyms?username=${username}`;
  console.log('***url***', url)
  const checkUsername = global
    .fetch(url)
    .then(response => response.json())
    .then(data => data);
    console.log('***checkUsername***', checkUsername)
  const isPseudonym = await checkUsername;
  console.log('***isPseudonym***', isPseudonym)
  return isPseudonym
};

export default () => {
  const region =
    // eslint-disable-next-line no-undef
    typeof window !== "undefined" && window.nuk && window.nuk.region;
  return storeURL[region] || storeURL.gb;
};

const storeURL = {
  gb:
    "https://thetimes.co.uk/subscribe/digital?ILC=GB-TNL_The_Times-Conversion_Page-Homepage-2020",
  ie:
    "https://store.thetimes.ie/?ILC=IE-TNL_The_Times-Conversion_Page-Homepage-2020",
  global:
    "https://globalstore.thetimes.co.uk/?ILC=INTL-TNL_The_Times-Conversion_Page-Homepage-2020"
};

export const userShouldUpdateName = async (username) => {

  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX displayname', username)

  const url = `https://www.uat-thetimes.co.uk/api/comments/display-names-pseudonyms?username=${username}`

  const checkUsername = fetch(url).then( (response) => {

  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX response ', response)
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')

  return response.json()

}).then(data => {
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX res ',  data)
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  return data
})


const isPseudonym = await checkUsername

console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX isPseudonym',   isPseudonym)
console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')

    const hasLocalStorageBeenSet = window.localStorage.getItem('realNameCommentingBannerViewCount')

    if (isPseudonym ) {
      if (!hasLocalStorageBeenSet) {
        window.localStorage.setItem('realNameCommentingBannerViewCount', 3);
        window.localStorage.setItem('isRealNameCommentingBannerVisible', false);
          }
      window.dispatchEvent(new CustomEvent('SHOW_REAL_NAME_COMMENTING_BANNER', {})        );
    }
}

export default () => {
  const region =
    // eslint-disable-next-line no-undef
    typeof window !== "undefined" && window.nuk && window.nuk.region;
  return storeURL[region] || storeURL.gb;
};




const storeURL = {
  gb:
    "https://thetimes.co.uk/subscribe/digital?ILC=GB-TNL_The_Times-Conversion_Page-Homepage-2020",
  ie:
    "https://store.thetimes.ie/?ILC=IE-TNL_The_Times-Conversion_Page-Homepage-2020",
  global:
    "https://globalstore.thetimes.co.uk/?ILC=INTL-TNL_The_Times-Conversion_Page-Homepage-2020"
};

export const userShouldUpdateName = async (username) => {

  if (!username) {
    return false
  }
  const url = `/api/comments/display-names-pseudonyms?username=${username}`

  const checkUsername = fetch(url).then( (response) => {
    return response.json()
  }).then(data => {


    console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
    console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
    console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX dataa', data )
    console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
    console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')

    return data
  })



  const isPseudonym = await checkUsername

  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX checkUsername ', isPseudonym )
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')

  if (!isPseudonym) {
    return false
  }

  const bannerCount = window.localStorage.getItem('realNameCommentingBannerViewCount')
  const isBannerVisible = window.localStorage.getItem('isRealNameCommentingBannerVisible')
  const hasLocalStorageBeenSet = bannerCount && isBannerVisible

  
      if (!hasLocalStorageBeenSet) {
        window.localStorage.setItem('realNameCommentingBannerViewCount', 3);
        window.localStorage.setItem('isRealNameCommentingBannerVisible', false);
          }


return bannerCount >= 0 ? true : false

    
}

export default () => {
  const region =
    // eslint-disable-next-line no-undef
    typeof window !== "undefined" && window.nuk && window.nuk.region;
  return storeURL[region] || storeURL.gb;
};




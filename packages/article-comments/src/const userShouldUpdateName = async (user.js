const userShouldUpdateName = async (username) => {

    console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
    console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
    console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX displayname', username)

    const url = `https://www.uat-thetimes.co.uk/api/comments/display-names-pseudonyms?username=${username}`

    const {isPseudonym} = fetch(url).then( (response) => {

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

  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX isPseudonym',  await isPseudonym)
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


  document.addEventListener(
    "spot-im-user-auth-success", (event) => {

      const {displayName, email, id, username} = event.detail

      userShouldUpdateName(displayName)
      console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
      console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
      console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX spot-im-user-auth-success', event)
      console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
      console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
    },
  );

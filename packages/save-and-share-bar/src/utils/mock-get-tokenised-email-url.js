export default url =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data: {
          article: {
            tokenisedUrl: `${url}?shareToken=333310c5af52a3c6e467e3b15516c950`
          }
        }
      });
    }, 1000);
  });
import { BASE_URL } from "../constants";

export default id =>
  Promise.resolve({
    data: {
      article: {
        tokenisedUrl: `${BASE_URL}/article/${id}?shareToken=333310c5af52a3c6e467e3b15516c950`
      }
    },
    loading: false
  });

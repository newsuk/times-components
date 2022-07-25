/* eslint-env browser */

const loginRequest = (url, completeSSOCallback) => {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", () => {
    const success = xhr.status === 200;
    const { spotimCodeB } = success ? JSON.parse(xhr.response) : {};
    if (spotimCodeB) {
      completeSSOCallback(spotimCodeB);
    }
  });
  xhr.open("GET", url);
  xhr.send();
};

const ssoCallback = (codeA, completeSSOCallback) => {
  const isFeatureFlagEnabled = window.location.search.includes(
    "enableRealNameCommenting"
  );

  const loginRequestUrl = isFeatureFlagEnabled
    ? "/api/comments/loginv2"
    : "/api/comments/login";

  return loginRequest(
    `${loginRequestUrl}?codeA=${encodeURIComponent(codeA)}`,
    completeSSOCallback
  );
};

const executeSSOtransaction = ( callback) => {
  if (window.SPOTIM && window.SPOTIM.startSSO) {
    window.SPOTIM.startSSO(ssoCallback);

    callback();
  }
};

export { ssoCallback };
export default executeSSOtransaction;

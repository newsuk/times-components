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

const ssoCallback = (codeA, completeSSOCallback) =>
  loginRequest(
    `/api/comments/loginv2?codeA=${encodeURIComponent(codeA)}`,
    completeSSOCallback
  );

const setNewUserToken = () => {
  window.localStorage.setItem("isUsingRealNameCommenting", true);
};

const executeSSOtransaction = callback => {
  if (window.SPOTIM && window.SPOTIM.startSSO) {
    window.SPOTIM.startSSO(ssoCallback);

    callback();

    const isFeatureFlagEnabled = window.location.search.includes(
      "enableRealNameCommenting"
    );

    if (isFeatureFlagEnabled) {
      setNewUserToken();
    }
  }
};

export { ssoCallback };
export default executeSSOtransaction;

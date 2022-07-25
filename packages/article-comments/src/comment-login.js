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

const isFeatureFlagEnabled = window.location.search.includes('enableRealNameCommenting');
const loginRequestUrl = isFeatureFlagEnabled ? '/api/comments/loginv2' : '/api/comments/login'


const ssoCallbackReadOnly = (codeA, completeSSOCallback) =>
  loginRequest(
    `/api/comments/loginv2?codeA=${encodeURIComponent(codeA)}&readOnly=true`,
    completeSSOCallback
  );

const ssoCallback = (codeA, completeSSOCallback) =>  loginRequest(
    `${loginRequestUrl}/loginv2?codeA=${encodeURIComponent(codeA)}`,
    completeSSOCallback
  )

const executeSSOtransaction = (isReadOnly, callback) => {
  if (window.SPOTIM && window.SPOTIM.startSSO) {
    if (isReadOnly) {
      window.SPOTIM.startSSO(ssoCallbackReadOnly);
    } else {
      window.SPOTIM.startSSO(ssoCallback);
   }

    callback();
  }
};

export default executeSSOtransaction;

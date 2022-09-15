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

const executeSSOtransaction = cpn => {
  if (window.SPOTIM && window.SPOTIM.startSSO) {
    if (window.location.search.includes("enableRealNameReauthentication")) {
      window.localStorage.setItem("isUsingRealNameCommentingV2", true);
    }

    window.SPOTIM.startSSO({ callback: ssoCallback, userId: cpn });
  }
};

export { ssoCallback };
export default executeSSOtransaction;

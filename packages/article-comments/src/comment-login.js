/* eslint-env browser */

const loginRequest = (url, completeSSOCallback) => {
  console.log("loginRequest", 1);
  const xhr = new XMLHttpRequest();
  console.log("loginRequest", 2);
  xhr.addEventListener("load", () => {
    console.log("loginRequest", 6);
    const success = xhr.status === 200;
    console.log("loginRequest", 7);
    const { spotimCodeB } = success ? JSON.parse(xhr.response) : {};
    console.log("loginRequest", 8);
    if (spotimCodeB) {
      console.log("loginRequest", 9);
      completeSSOCallback(spotimCodeB);
    }
  });
  console.log("loginRequest", 3);
  xhr.open("GET", url);
  console.log("loginRequest", 4);
  xhr.send();
  console.log("loginRequest", 5);
};

const ssoCallback = (codeA, completeSSOCallback) => {
  console.log("ssoCallback");
  loginRequest(
    `/api/comments/loginv2?codeA=${encodeURIComponent(codeA)}`,
    completeSSOCallback
  );
};

const setNewUserToken = () => {
  window.localStorage.setItem("isUsingRealNameCommenting", true);
};

const executeSSOtransaction = callback => {
  if (window.SPOTIM && window.SPOTIM.startSSO) {
    window.SPOTIM.startSSO(ssoCallback);

    callback();

    const isRealNameReauthenticationEnabled = window.location.search.includes(
      "enableRealNameReauthentication"
    );

    if (isRealNameReauthenticationEnabled) {
      setNewUserToken();
    }
  }
};

export { ssoCallback };
export default executeSSOtransaction;

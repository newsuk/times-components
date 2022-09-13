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

const executeSSOtransaction = () => {
  if (window.SPOTIM && window.SPOTIM.startSSO) {
    if (window.location.search.includes("enableRealNameReauthentication")) {
      window.localStorage.setItem("isUsingRealNameCommentingV2", true);
    }

    window.SPOTIM.startSSO(ssoCallback);
  }
};

export { ssoCallback };
export default executeSSOtransaction;

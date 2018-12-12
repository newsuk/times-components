/* eslint-env browser */

const ssoCallback = (codeA, completeSSOCallback) => {
  const url = `/api/comments/login?codeA=${encodeURIComponent(codeA)}`;
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

const executeSSOtransaction = () => {
  if (window.SPOTIM && window.SPOTIM.startSSO) {
    window.SPOTIM.startSSO(ssoCallback);
  }
};

export default executeSSOtransaction;

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

const executeSSOtransaction = callback => {
  if (window.SPOTIM && window.SPOTIM.startSSO) {
    window.SPOTIM.startSSO(ssoCallback);

    callback();
  }
};

export default executeSSOtransaction;

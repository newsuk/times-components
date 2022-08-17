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
  console.log('***isUsingRealNameCommenting token set***');
};

const executeSSOtransaction = callback => {
  console.log('***5 in executeSSOtransaction***');
  if (window.SPOTIM && window.SPOTIM.startSSO) {
    console.log('***6A in window.SPOTIM exists and startSSO branch***');
    window.SPOTIM.startSSO(ssoCallback);
    setNewUserToken();
    callback();
    console.log('***7 in executeSSOtransaction after setNewUserToken called***');
  }
  console.log('***6B in window.SPOTIM does not exist branch***');
};

export { ssoCallback, setNewUserToken };
export default executeSSOtransaction;

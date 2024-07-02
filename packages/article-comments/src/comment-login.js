/* eslint-env browser */
import getCpnId from "./utils";

const loginRequest = (url, completeSSOCallback) => {
  console.log("doso je pajdo");
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", () => {
    const success = xhr.status === 200;
    console.log(success, "sucess wtf");
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

const executeSSOtransaction = () => {
  if (window.SPOTIM && window.SPOTIM.startSSO) {
    const acsTnlCookie =
      window &&
      window.nuk &&
      window.nuk.getCookieValue &&
      window.nuk.getCookieValue("acs_tnl");

    const cpn = `${getCpnId(acsTnlCookie)}_v2`;
    console.log(cpn, "CPN");
    window.SPOTIM.startSSO({ callback: ssoCallback, userId: cpn });
  }
};

export { ssoCallback };
export default executeSSOtransaction;

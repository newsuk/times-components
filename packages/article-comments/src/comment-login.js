/* eslint-env browser */
import { getCpnId } from "./utils";

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

const executeSSOtransaction = () => {
  if (window.SPOTIM && window.SPOTIM.startSSO) {
    const acsTnlCookie =
      window &&
      window.nuk &&
      window.nuk.getCookieValue &&
      window.nuk.getCookieValue("acs_tnl");

    let cpn = getCpnId(acsTnlCookie);

    if (window.location.search.includes("enableRealNameReauthentication")) {
      cpn = `${cpn}_v2`;

      if (!window.localStorage.getItem("isUsingRealNameCommentingV2")) {
        window.localStorage.removeItem("SPOTIM_DEVICE_V2");
        window.localStorage.removeItem("SPOTIM_ACCESS_TOKEN");
        window.localStorage.setItem("isUsingRealNameCommentingV2", true);
      }
    }

    window.SPOTIM.startSSO({ callback: ssoCallback, userId: cpn });
  }
};

export { ssoCallback };
export default executeSSOtransaction;

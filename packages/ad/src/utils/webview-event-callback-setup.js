// NOTE: this function must be self-contained, i.e. contain no references to variables
// defined outside the function, so that it can be passed into a WebView.

/* eslint-env browser */

const webviewEventCallbackSetup = (options) => {
  const { window } = options;
  window.eventCallback = (type, detail) => {
    window.postMessage(
      JSON.stringify({
        detail,
        isTngMessage: true,
        type,
      }),
    );
  };
  window.addEventListener("error", (ev) => {
    const file = (ev.filename || "").substring(0, 100);
    window.eventCallback(
      "error",
      `msg=${ev.message || ""}, file=${file}, line=${ev.lineno || ""}, col=${
        ev.colno || ""
      }`,
    );
  });
  // eslint-disable-next-line no-console
  window.console.error = (...args) => {
    window.eventCallback("error", args.join("\n"));
  };
};

export default webviewEventCallbackSetup;

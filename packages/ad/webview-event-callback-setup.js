// NOTE: this function is serialised to a string and passed into a webview.
// See the warning about the implications of this in dom-context-harness.js

/* eslint-env browser */

const webviewEventCallbackSetup = options => {
  const { window } = options;
  window.eventCallback = (type, detail) => {
    // delay until next frame as React Native message bridge is not set up immediately
    window.requestAnimationFrame(() => {
      const method = window.reactBridgePostMessage || window.postMessage;
      method(
        JSON.stringify({
          isTngMessage: true,
          type,
          detail
        }),
        "*"
      );
    });
  };
  window.addEventListener("error", ev => {
    const file = (ev.filename || "").substring(0, 100);
    window.eventCallback(
      "error",
      `msg=${ev.message || ""}, file=${file}, line=${ev.lineno ||
        ""}, col=${ev.colno || ""}`
    );
  });
  // eslint-disable-next-line no-console
  window.console.error = (...args) => {
    window.eventCallback("error", args.join("\n"));
  };
};

export default webviewEventCallbackSetup;

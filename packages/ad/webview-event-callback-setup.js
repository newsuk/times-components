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
  window.onerror = (msg, file, line, col, error) => {
    window.eventCallback(
      "error",
      `msg=${msg}, file=${file}, line=${line}, col=${col}, error=${error}`
    );
  };
  // eslint-disable-next-line no-console
  window.console.error = (...args) => {
    window.eventCallback("error", args.join("\n"));
  };
};

export default webviewEventCallbackSetup;

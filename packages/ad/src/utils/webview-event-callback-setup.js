// NOTE: this function must be self-contained, i.e. contain no references to variables
// defined outside the function, so that it can be passed into a WebView.

/* eslint-env browser */

const webviewEventCallbackSetup = options => {
  const { window } = options;

  // Enqueue window messages until it's ready - See https://github.com/facebook/react-native/issues/11594#issuecomment-274689549 for details
  let isReactNativePostMessageReady = !!window.originalPostMessage;
  const queue = [];
  let currentPostMessageFn = function store(message) {
    if (queue.length > 100) queue.shift();
    queue.push(message);
  };

  const sendQueue = () => {
    while (queue.length > 0) window.postMessage(queue.shift());
  };

  if (!isReactNativePostMessageReady) {
    Object.defineProperty(window, "postMessage", {
      configurable: true,
      enumerable: true,
      get() {
        return currentPostMessageFn;
      },
      set(fn) {
        currentPostMessageFn = fn;
        isReactNativePostMessageReady = true;
        window.setTimeout(sendQueue, 0);
      }
    });
  }

  window.eventCallback = (type, detail) => {
    window.postMessage(
      JSON.stringify({
        isTngMessage: true,
        type,
        detail
      })
    );
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

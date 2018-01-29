// NOTE: this function is serialised to a string and executed in a webview,
// don't import any other modules or refer to variables defined outside of
// the function body. Note that use of ES6 features like iteration and classes
// will end up transpiling into code that uses helper functions like
// _createClass, so keep this code ES5.

const makeHarness = ({
  document,
  window,
  el,
  id,
  init,
  data,
  scriptUris,
  globalNames,
  handleError
}) => {
  let loaded = false;

  const withCatch = (blockName, action) => {
    try {
      action();
    } catch (e) {
      handleError(blockName, e.message);
    }
  };

  return {
    execute() {
      withCatch("execute", () => {
        window.postMessage({ loaded: true }, "*");
        this.injectScripts();
        this.runInitIfGlobalsPresent();
      });
    },

    injectScripts() {
      for (let i = 0; i < scriptUris.length; i += 1) {
        const scriptUri = scriptUris[i];
        const scriptId = `dom-context-script-${scriptUri.replace(/\W/g, "")}`;
        let script = document.getElementById(scriptId);
        if (!script) {
          script = document.createElement("script");
          script.id = scriptId;
          script.src = scriptUri;
          script.defer = true;
          document.head.appendChild(script);
        }
        script.addEventListener("load", this.handleScriptLoad.bind(this));
      }
    },

    handleScriptLoad() {
      this.runInitIfGlobalsPresent();
    },

    runInitIfGlobalsPresent() {
      withCatch("runInitIfGlobalsPresent", () => {
        if (loaded) {
          return;
        }
        for (let i = 0; i < globalNames.length; i += 1) {
          const globalName = globalNames[i];
          if (typeof window[globalName] === "undefined") {
            return;
          }
        }
        this.runInit();
      });
    },

    runInit() {
      withCatch("runInit", () => {
        loaded = true;
        const globals = {};
        for (let i = 0; i < globalNames.length; i += 1) {
          const globalName = globalNames[i];
          globals[globalName] = window[globalName];
        }
        el.setAttribute("id", id);
        init(el, data, globals);
      });
    }
  };
};

export default makeHarness;

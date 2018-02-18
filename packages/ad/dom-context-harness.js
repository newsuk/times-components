// NOTE: this function is serialised to a string and executed in a webview,
// don't import any other modules or refer to variables defined outside of
// the function body. Note that use of some ES6 features like iteration and
// classes will end up transpiling into code that uses helper functions like
// _createClass, so keep this code simple. If you change this function, test
// the DOMContext and Ad stories in both web and native storybooks.
// NATIVE: window and document objects are relative to each WebView
// WEB: window and document objects are shared between the ads components

const makeHarness = ({
  document,
  window,
  el,
  init,
  data,
  scriptUris,
  globalNames,
  eventCallback
}) => {
  let initCalled = false;
  let renderCompleteCalled = false;

  const withCatch = action => {
    try {
      action();
    } catch (e) {
      // eslint-disable-next-line no-console
      window.console.error(`DOMContext Error: ${e.message}\n${e.stack}`);
      eventCallback("error", e.message);
    }
  };
  const log = (...message) => {
    eventCallback("log", `${data.pos} ad: ${message.join(" ")}`);
  };
  return {
    execute() {
      withCatch(() => {
        // eslint-disable-next-line no-param-reassign
        window.scripts = window.scripts || [];
        this.loadScriptsParallel(scriptUris, () => {
          this.runInitIfGlobalsPresent();
        });
      });
    },
    runInitIfGlobalsPresent() {
      if (scriptUris.length === window.scripts.length) {
        this.runInit();
      }
    },
    addProcessedScript(scriptId) {
      if (this.isScriptProcessed(scriptId)) {
        return;
      }
      window.scripts.push(scriptId);
    },
    isScriptProcessed(scriptId) {
      return window.scripts.indexOf(scriptId) > -1;
    },

    scriptLoaded(scriptId) {
      withCatch(() => {
        log("script loaded:", scriptId);
        this.addProcessedScript(scriptId);
        this.runInitIfGlobalsPresent();
      });
    },
    scriptErrored(scriptId, canRequestFail, err) {
      withCatch(() => {
        log("script errored:", scriptId);
        this.addProcessedScript(scriptId);
        if (!canRequestFail) {
          throw new Error(`Failed to load the script ${err}`);
        }
        this.runInitIfGlobalsPresent();
      });
    },

    scriptTimeout(scriptId) {
      withCatch(() => {
        log(
          "script timeout id:",
          scriptId,
          "already processed:",
          this.isScriptProcessed(scriptId)
        );
        if (this.isScriptProcessed(scriptId)) {
          return;
        }
        this.addProcessedScript(scriptId);
        this.runInitIfGlobalsPresent();
      });
    },

    loadScriptsParallel(scripts, callback) {
      if (scripts.length === 0) {
        callback();
      }
      for (let i = 0; i < scripts.length; i += 1) {
        const scriptUri = scripts[i].uri;
        const timeout = scripts[i].timeout || -1;
        const canRequestFail = scripts[i].canRequestFail || false;
        const scriptId = `dom-context-script-${scriptUri.replace(/\W/g, "")}`;
        let script = document.getElementById(scriptId);
        if (!script) {
          log("create script:", scriptId);
          script = document.createElement("script");
          script.id = scriptId;
          script.type = "text/javascript";
          script.src = scriptUri;
          script.defer = true;
          document.head.appendChild(script);
        } else {
          this.runInitIfGlobalsPresent();
        }
        script.addEventListener("load", this.scriptLoaded.bind(this, scriptId));
        script.addEventListener(
          "error",
          this.scriptErrored.bind(this, scriptId, canRequestFail)
        );
        if (timeout > 0) {
          const scriptTimeout = this.scriptTimeout.bind(this, scriptId);
          window.setTimeout(() => {
            scriptTimeout();
          }, timeout);
        }
      }
    },

    runInit() {
      withCatch(() => {
        if (initCalled) {
          return;
        }
        initCalled = true;
        const globals = {};
        for (let i = 0; i < globalNames.length; i += 1) {
          const globalName = globalNames[i];
          globals[globalName] = window[globalName];
        }
        const renderComplete = () => {
          if (!renderCompleteCalled) {
            renderCompleteCalled = true;
            eventCallback("renderComplete");
          }
        };
        const initialiser = init({
          el,
          data,
          globals,
          renderComplete,
          window,
          document
        });
        if (initialiser && initialiser.execute) {
          initialiser.execute();
        }
      });
    }
  };
};

export default makeHarness;

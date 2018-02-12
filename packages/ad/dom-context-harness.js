// NOTE: this function is serialised to a string and executed in a webview,
// don't import any other modules or refer to variables defined outside of
// the function body. Note that use of some ES6 features like iteration and
// classes will end up transpiling into code that uses helper functions like
// _createClass, so keep this code simple. If you change this function, test
// the DOMContext and Ad stories in both web and native storybooks.

const makeHarness = ({
  document,
  window,
  el,
  data,
  init,
  scriptUris,
  globalNames,
  eventCallback
}) => {
  let renderCompleteCalled = false;
  let initCalled = false;

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
    // eslint-disable-next-line no-console
    window.console.info(`${data.code}:`, ...message);
  };
  return {
    execute() {
      withCatch(() => {
        // eslint-disable-next-line no-param-reassign
        window.scritpsProcessed = window.scritpsProcessed || [];
        this.loadScriptsParallel(scriptUris, () => {
          this.runInitIfGlobalsPresent();
        });
      });
    },
    runInitIfGlobalsPresent() {
      log(
        "runInitIfGlobalsPresent",
        "global scripts loaded:",
        window.scritpsProcessed,
        "local scripts to load:",
        scriptUris.length
      );
      if (scriptUris.length === window.scritpsProcessed.length) {
        this.runInit();
      }
    },
    addProcessedScript(scriptId) {
      if (this.isScriptProcessed(scriptId)) {
        return;
      }
      window.scritpsProcessed.push(scriptId);
    },
    isScriptProcessed(scriptId) {
      return window.scritpsProcessed.indexOf(scriptId) > -1;
    },
    reportError(err) {
      // eslint-disable-next-line no-console
      window.console.error(`Error while loading the script: ${err}`);
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
        this.reportError();
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
      // no external scripts to load, execute init
      if (scripts.length === 0) {
        callback();
      }
      for (let i = 0; i < scripts.length; i += 1) {
        const scriptUri = scripts[i].uri;
        const timeout = scripts[i].timeout || -1;
        const canRequestFail = scripts[i].canRequestFail || false;
        const scriptId = `dom-context-script-${scriptUri.replace(/\W/g, "")}`;
        // we rely on the shared (between the dom-context) document to check if we have already loaded the script
        // maybe with a different Ad component on the page
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
          // the script was already created, maybe from a different Ad component
          log("this script was already created:", scriptId);
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
        log("run init was already called:", initCalled);
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

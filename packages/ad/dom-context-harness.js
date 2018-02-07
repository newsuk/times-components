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
  preScripts,
  scriptUris,
  globalNames,
  eventCallback
}) => {
  let renderCompleteCalled = false;
  let initCalled = false;
  const scritpsLoaded = [];
  const scriptsErrored = [];

  const withCatch = action => {
    try {
      action();
    } catch (e) {
      // eslint-disable-next-line no-console
      window.console.error(`DOMContext Error: ${e.message}\n${e.stack}`);
      eventCallback("error", e.message);
    }
  };

  const isScriptLoaded = scriptId => scritpsLoaded.indexOf(scriptId) > -1;
  const isScriptErrored = scriptId => scriptsErrored.indexOf(scriptId) > -1;

  return {
    loadScripts() {
      this.injectScripts(scriptUris, err => {
        if (err) {
          this.reportError(err);
          return;
        }
        this.handleScriptLoad();
      });
    },
    execute() {
      withCatch(() => {
        this.injectScripts(preScripts, err => {
          this.loadScripts();
          if (err) {
            this.reportError(err);
          }
        });
        setTimeout(() => {
          this.loadScripts();
        }, 500);
      });
    },
    checkForInit() {
      const totalScriptsProcessed =
        scritpsLoaded.length + scriptsErrored.length;
      if (totalScriptsProcessed === scriptUris.length) {
        this.runInit();
      }
    },
    reportError(err) {
      // eslint-disable-next-line no-console
      window.console.error(`Error while loading the script: ${err}`);
    },

    scriptLoaded(scriptId) {
      scritpsLoaded.push(scriptId);
      this.checkForInit();
    },
    scriptErrored(scriptId, canRequestFail, err) {
      scriptsErrored.push(scriptId);
      if (!canRequestFail) {
        throw new Error(`Failed to load the script ${err}`);
      }
      this.reportError();
      this.checkForInit();
    },

    scriptTimeout(scriptId) {
      if (isScriptLoaded(scriptId) || isScriptErrored(scriptId)) {
        return;
      }
      scriptsErrored.push(scriptId);
      this.checkForInit();
    },

    reportError(err) {
      // eslint-disable-next-line no-console
      window.console.error(`Error while loading the script: ${err}`);
    },

    injectScripts(scripts, func) {
      for (let i = 0; i < scripts.length; i += 1) {
        const scriptUri = scripts[i];
        const scriptId = `dom-context-script-${scriptUri.replace(/\W/g, "")}`;
        let script = document.getElementById(scriptId);
        if (!script) {
          script = document.createElement("script");
          script.id = scriptId;
          script.type = "text/javascript";
          script.addEventListener(
            "load",
            this.scriptLoaded.bind(this, scriptId)
          );
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
          script.src = scriptUri;
          script.defer = true;
          document.head.appendChild(script);
        }
        script.addEventListener("load", func.bind(null, null));
        script.addEventListener("error", func);
      }
    },

    handleScriptLoad() {
      this.runInit();
    },

    runInit() {
      withCatch(() => {
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

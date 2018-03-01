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
  scripts,
  platform,
  eventCallback
}) => {
  let scriptsLoadedCalled = false;
  let renderCompleteCalled = false;

  const withCatch = action => {
    try {
      action();
    } catch (e) {
      // eslint-disable-next-line no-console
      window.console.error(`DOMContext Error: ${e.message}\n${e.stack}`);
      eventCallback("error", `${e.message}${e.stack}`);
    }
  };
  return {
    execute() {
      withCatch(() => {
        // eslint-disable-next-line no-param-reassign
        window.scritpsProcessed = window.scritpsProcessed || [];
        const renderComplete = () => {
          if (!renderCompleteCalled) {
            renderCompleteCalled = true;
            eventCallback("renderComplete");
          }
        };
        const initialiser = init({
          el,
          data,
          window,
          document,
          renderComplete,
          platform,
          eventCallback
        });
        if (initialiser && initialiser.init) {
          initialiser.init();
        }
        this.loadScriptsParallel();
      });
    },
    runScriptsLoadedIf() {
      if (scripts.length === window.scritpsProcessed.length) {
        this.scriptsLoaded();
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

    scriptLoaded(scriptId) {
      withCatch(() => {
        this.addProcessedScript(scriptId);
        this.runScriptsLoadedIf();
      });
    },
    scriptErrored(scriptId, canRequestFail, err) {
      withCatch(() => {
        this.addProcessedScript(scriptId);
        if (!canRequestFail) {
          throw new Error(`Failed to load the script ${err}`);
        }
        this.runScriptsLoadedIf();
      });
    },

    scriptTimeout(scriptId) {
      withCatch(() => {
        if (this.isScriptProcessed(scriptId)) {
          return;
        }
        this.addProcessedScript(scriptId);
        this.runScriptsLoadedIf();
      });
    },

    loadScriptsParallel() {
      if (scripts.length === 0) {
        this.runScriptsLoadedIf();
      }
      for (let i = 0; i < scripts.length; i += 1) {
        const scriptUri = scripts[i].uri;
        const timeout = scripts[i].timeout || -1;
        const canRequestFail = scripts[i].canRequestFail || false;
        const scriptId = `dom-context-script-${scriptUri.replace(/\W/g, "")}`;
        let script = document.getElementById(scriptId);
        if (!script) {
          script = document.createElement("script");
          script.id = scriptId;
          script.type = "text/javascript";
          script.src = scriptUri;
          script.defer = true;
          document.head.appendChild(script);
        } else {
          this.runScriptsLoadedIf();
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

    scriptsLoaded() {
      withCatch(() => {
        if (scriptsLoadedCalled) {
          return;
        }
        scriptsLoadedCalled = true;

        const renderComplete = () => {
          if (!renderCompleteCalled) {
            renderCompleteCalled = true;
            eventCallback("renderComplete");
          }
        };
        // FIXME we're calling init again after scripts load... We should be caching the first initialiser and calling the scriptsLoaded hook.
        // better still, we could move script loading out of DOMContext and into ad-init
        const initialiser = init({
          el,
          data,
          renderComplete,
          window,
          platform,
          eventCallback
        });
        if (initialiser && initialiser.scriptsLoaded) {
          initialiser.scriptsLoaded();
        }
      });
    }
  };
};

export default makeHarness;

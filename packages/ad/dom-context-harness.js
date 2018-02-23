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
  platform,
  // TODO: can we safetely remove the global concept???
  // globalNames,
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
  const log = (message) => {
    eventCallback("log", `${data.pos} ad: ${message}`);
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

        if (initialiser.init) {
          initialiser.init();
        }
        this.loadScriptsParallel(scriptUris, () => {
          this.runScriptsLoadedIf();
        });
      });
    },
    runScriptsLoadedIf() {
      if (scriptUris.length === window.scritpsProcessed.length) {
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
        log(`script loaded: ${scriptId}`);
        this.addProcessedScript(scriptId);
        this.runScriptsLoadedIf();
      });
    },
    scriptErrored(scriptId, canRequestFail, err) {
      withCatch(() => {
        log(`script errored ${scriptId}`);
        this.addProcessedScript(scriptId);
        if (!canRequestFail) {
          throw new Error(`Failed to load the script ${err}`);
        }
        this.runScriptsLoadedIf();
      });
    },

    scriptTimeout(scriptId) {
      withCatch(() => {
        log(`script timeout id: ${scriptId} already processed: ${this.isScriptProcessed(scriptId)}`);
        if (this.isScriptProcessed(scriptId)) {
          return;
        }
        this.addProcessedScript(scriptId);
        this.runScriptsLoadedIf();
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

        // TODO: can we safetely remove the global concept???
        // const globals = {};
        // for (let i = 0; i < globalNames.length; i += 1) {
        //   const globalName = globalNames[i];
        //   globals[globalName] = window[globalName];
        // }
        const renderComplete = () => {
          if (!renderCompleteCalled) {
            renderCompleteCalled = true;
            eventCallback("renderComplete");
          }
        };
        const initialiser = init({
          el,
          data,
          // TODO: can we safetely remove the global concept???
          // globals,
          renderComplete,
          window,
          platform,
          eventCallback
          // TODO: can we safetely remove the document???
          // document
        });
        if (initialiser && initialiser.scriptsLoaded) {
          initialiser.scriptsLoaded();
        }
      });
    }
  };
};

export default makeHarness;

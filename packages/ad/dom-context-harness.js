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
  init,
  data,
  preScripts,
  scriptUris,
  globalNames,
  eventCallback
}) => {
  let initialised = false;
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

  return {
    loadScripts() {
      this.injectScripts(scriptUris, (err, data) => {
        if(err){
          this.reportError(err);
          return;
        }
        this.handleScriptLoad();
      });
    },
    execute() {
      withCatch(() => {
        this.injectScripts(preScripts, (err) => {
          this.loadScripts();
          if(err){
            this.reportError(err);
            return;
          }
        });
        setTimeout(() => {
          this.loadScripts();
        }, 500);
      });
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
          console.log("window[globalName]", globalName, window[globalName]);
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

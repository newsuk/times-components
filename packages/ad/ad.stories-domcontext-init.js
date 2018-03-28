/* eslint-env browser */
// NOTE: this test exists to stop people breaking the DOMContext story on native
// by refactoring it in a way that makes the init function non-self-contained, e.g. by
// introducing styleguide references.
// Coverage is turned off because this function is only used in stories and so doesn't
// require unit testing of functionality
/* istanbul ignore next */
const domContextInit = args => {
  const { el, data, window, eventCallback } = args;
  return {
    init() {
      const worked = data.message === "data value";
      el.innerHTML = `
        <div style="
            background: ${data.background};
            font-size: ${data.heading};
            padding: ${data.padding};
        ">
          worked=${worked}<br>
          data.message=${data.message}<br>
          window.global1=${window.global1}<br>
          <button class="renderComplete">call <code>renderComplete()</code></button><br>
          <button class="logMessages">log messages</button><br>
          <button class="exception" onclick="throw new Error('bar')"><code>throw new Error("bar");</button><br>
          <button class="console-error" onclick="console.error('err')"><code>console.error("err");</code></button><br>
        </div>
      `;
      el
        .getElementsByClassName("renderComplete")[0]
        .addEventListener("click", () => {
          eventCallback("renderComplete");
        });
      el
        .getElementsByClassName("logMessages")[0]
        .addEventListener("click", () => {
          eventCallback("log", "message 1");
          eventCallback("log", "message 2");
          eventCallback("log", "message 3");
          eventCallback("log", "message 4");
        });
    }
  };
};

export default domContextInit;

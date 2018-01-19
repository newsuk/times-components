/* eslint-env browser */
import React from "react";

import nativeStories from "./ad.stories.native.js";
import webStories from "./ad.stories.web.js";

import NativeDOMContext from "./dom-context.native";
import WebDOMContext from "./dom-context.web";

// will pick either web or native stories

let stories;
let DOMContext;
if (window.document) {
  stories = webStories();
  DOMContext = WebDOMContext;
} else {
  stories = nativeStories();
  DOMContext = NativeDOMContext;
}

stories
  .add("DOMContext", () => {
    // script content: `window.global1 = "external value";`
    const script =
      "data:text/javascript;charset=utf-8;base64,d2luZG93Lmdsb2JhbDEgPSAiZXh0ZXJuYWwgdmFsdWUiOw==";

    return (
      <DOMContext
        scriptUris={[script]}
        globalNames={["global1"]}
        data={{ message: "data value" }}
        init={(el, { message }, { global1 }) => {
          const worked =
            message === "data value" && global1 === "external value";
          const widget = document.createElement("div");
          widget.style.width = "100%";
          widget.style.height = "100%";
          widget.style.backgroundColor = worked ? "#8C8" : "#C88";
          widget.style.fontSize = "20px";
          widget.style.padding = "10px";
          widget.style.whiteSpace = "pre";
          widget.textContent = `worked=${worked}\ndata.message=${
            message
          }\nglobals.global1=${global1}`;
          el.appendChild(widget);
        }}
        width={300}
        height={200}
      />
    );
  })
  .add("DOMContext with internal error", () => (
    <DOMContext
      init={() => {
        throw new Error("Example error message");
      }}
    />
  ));

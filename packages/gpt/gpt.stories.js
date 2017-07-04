/* eslint-env browser */
import nativeStories from "./gpt.stories.native.js";
import webStories from "./gpt.stories.web.js";

// will pick either web or native stories
const stories = () => {
  if (window.document) {
    webStories();
  } else {
    nativeStories();
  }
};

stories();

/* eslint-env browser */
import nativeStories from "./ad.stories.native";
import webStories from "./ad.stories.web";

// will pick either web or native stories
const stories = () => {
  if (window.document) {
    webStories();
  } else {
    nativeStories();
  }
};

stories();

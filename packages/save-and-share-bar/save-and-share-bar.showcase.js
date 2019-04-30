import React from "react";
import saveApi from "@times-components/save-star-web/mock-save-api-showcase";
import SaveAndShareBar from "./src/save-and-share-bar";

export default {
  children: [
    {
      component: () => (
        <SaveAndShareBar
          articleId="9bd029d2-49a1-11e9-b472-f58a50a13bbb"
          articleHeadline="test-headline"
          articleUrl="article-url-test"
          onCopyLink={() => {}}
          saveApi={saveApi}
        />
      ),
      name: "Save snd Share bar",
      type: "story"
    }
  ],
  name: "Composed/Save and Share bar"
};

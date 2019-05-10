import React from "react";
import SaveAndShareBar from "./src/save-and-share-bar";

export default {
  children: [
    {
      component: () => (
        <SaveAndShareBar
          articleId="id-123"
          articleHeadline="test-headline"
          articleUrl="https://www.thetimes.co.uk/"
          onCopyLink={() => {}}
          onSaveToMyArticles={() => {}}
          onShareOnEmail={() => {}}
        />
      ),
      name: "Save snd Share bar",
      type: "story"
    }
  ],
  name: "Composed/Save and Share bar"
};

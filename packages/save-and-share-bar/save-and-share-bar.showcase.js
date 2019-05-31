import React from "react";
import saveApi from "@times-components/save-star-web/mock-save-api-showcase";
import SaveAndShareBar from "./src/save-and-share-bar";

const mockGetTokenisedArticleUrl = id =>
  new Promise(resolve =>
    setTimeout(
      () =>
        resolve({
          data: {
            article: {
              tokenisedUrl: `https://www.thetimes.co.uk/article/${id}?shareToken=333310c5af52a3c6e467e3b15516c950`
            }
          }
        }),
      1000
    )
  );

export default {
  children: [
    {
      component: () => (
        <SaveAndShareBar
          articleId="9bd029d2-49a1-11e9-b472-f58a50a13bbb"
          articleHeadline="test-headline"
          articleUrl="https://www.thetimes.co.uk/"
          onCopyLink={() => {}}
          getTokenisedShareUrl={mockGetTokenisedArticleUrl}
          saveApi={saveApi}
          savingEnabled
          sharingEnabled
        />
      ),
      name: "Save and Share bar",
      type: "story"
    }
  ],
  name: "Composed/Save and Share bar"
};

import React from "react";
import { scales } from "@times-components/styleguide";
import { MessageManager, MessageContext } from "@times-components/message-bar";
import { ContextProviderWithDefaults } from "@times-components/context";
import { MockBookmarksProvider } from "@times-components/provider-test-tools";
import SaveAndShareBar from "./src/save-and-share-bar";

const articleId = "5504b5a8-b1c0-11e8-a553-a0ee9be48bc6";

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
        <MockBookmarksProvider delay={1000} articleId={articleId}>
          <MessageManager animate delay={3000} scale={scales.medium}>
            <MessageContext.Consumer>
              {({ showMessage }) => (
                <SaveAndShareBar
                  articleId={articleId}
                  articleHeadline="test-headline"
                  articleUrl="https://www.thetimes.co.uk/"
                  onCopyLink={() => showMessage("Article link copied")}
                  getTokenisedShareUrl={mockGetTokenisedArticleUrl}
                  savingEnabled
                  sharingEnabled
                />
              )}
            </MessageContext.Consumer>
          </MessageManager>
        </MockBookmarksProvider>
      ),
      name: "Save and Share bar",
      type: "story"
    },
    {
      component: () => (
        <ContextProviderWithDefaults
          value={{
            newskit: true
          }}
        >
          <MockBookmarksProvider delay={1000} articleId={articleId}>
            <MessageManager animate delay={3000} scale={scales.medium}>
              <MessageContext.Consumer>
                {({ showMessage }) => (
                  <SaveAndShareBar
                    articleId={articleId}
                    articleHeadline="test-headline"
                    articleUrl="https://www.thetimes.co.uk/"
                    onCopyLink={() => showMessage("Article link copied")}
                    getTokenisedShareUrl={mockGetTokenisedArticleUrl}
                    savingEnabled
                    sharingEnabled
                  />
                )}
              </MessageContext.Consumer>
            </MessageManager>
          </MockBookmarksProvider>
        </ContextProviderWithDefaults>
      ),
      name: "NewsKit Share bar",
      type: "story"
    }
  ],
  name: "Composed/Save and Share bar"
};

/* eslint-disable react/prop-types */
import React from "react";
import { scales } from "@times-components/styleguide";
import { MessageManager, MessageContext } from "@times-components/message-bar";
import SaveAndShareBar from "./src/save-and-share-bar";
import {
  bookmarks,
  MockedProvider,
  schemaToMocks
} from "@times-components/provider-test-tools";

const articleId = "5504b5a8-b1c0-11e8-a553-a0ee9be48bc6";

function BookmarksMockProvider({ children }) {
  const [mocks, setMocks] = React.useState([]);

  React.useEffect(() => {
    schemaToMocks(bookmarks({ id: articleId })).then(bookmarkMocks =>
      setMocks(bookmarkMocks)
    );
  }, []);

  if (!mocks.length) {
    return null;
  }

  return <MockedProvider mocks={mocks}>{children}</MockedProvider>;
}

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
        <BookmarksMockProvider>
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
        </BookmarksMockProvider>
      ),
      name: "Save and Share bar",
      type: "story"
    }
  ],
  name: "Composed/Save and Share bar"
};

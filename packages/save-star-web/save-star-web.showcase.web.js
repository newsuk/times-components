/* eslint-disable react/prop-types */
import React from "react";
import { View } from "react-native";
import { spacing, colours } from "@times-components/styleguide";
import {
  bookmarks,
  MockedProvider,
  schemaToMocks
} from "@times-components/provider-test-tools";

import SaveStarWeb from "./src/save-star-web";

const styles = {
  star: {
    alignItems: "center",
    flexDirection: "row",
    padding: spacing(4)
  }
};

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

export default {
  children: [
    {
      component: () => (
        <BookmarksMockProvider>
          <View style={styles.star}>
            <SaveStarWeb
              colour={colours.functional.secondary}
              hoverColour={colours.functional.brandColour}
              articleId={articleId}
            />
          </View>
        </BookmarksMockProvider>
      ),
      name: "SaveStarWeb",
      type: "story"
    }
  ],
  name: "Primitives/SaveStarWeb"
};

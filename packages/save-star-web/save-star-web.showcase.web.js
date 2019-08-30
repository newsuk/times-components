/* eslint-disable react/prop-types */
import React from "react";
import { View } from "react-native";
import { spacing, colours } from "@times-components/styleguide";
import SaveStarWeb from "./src/save-star-web";

import MockBookmarksProvider from "./mock-bookmarks-provider";

const styles = {
  star: {
    alignItems: "center",
    flexDirection: "row",
    padding: spacing(4)
  }
};

export default {
  children: [
    {
      component: () => (
        <MockBookmarksProvider articleId="5504b5a8-b1c0-11e8-a553-a0ee9be48bc6">
          <View style={styles.star}>
            <SaveStarWeb
              colour={colours.functional.secondary}
              hoverColour={colours.functional.brandColour}
              articleId="5504b5a8-b1c0-11e8-a553-a0ee9be48bc6"
            />
          </View>
        </MockBookmarksProvider>
      ),
      name: "SaveStarWeb",
      type: "story"
    }
  ],
  name: "Primitives/SaveStarWeb"
};

import React from "react";
import { View } from "react-native";
import { spacing } from "@times-components/styleguide";
import SaveStarWeb from "./src/save-star-web";
import mockSaveApi from "./mock-save-api-showcase";

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
        <View style={styles.star}>
          <SaveStarWeb
            articleId="5504b5a8-b1c0-11e8-a553-a0ee9be48bc6"
            saveApi={mockSaveApi}
          />
        </View>
      ),
      name: "SaveStarWeb",
      type: "story"
    }
  ],
  name: "Primitives/SaveStarWeb"
};

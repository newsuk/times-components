import React from "react";
import { TcView } from "@times-components/utils";
import { spacing, colours } from "@times-components/ts-styleguide";
import { MockBookmarksProvider } from "@times-components/provider-test-tools";

import SaveStarWeb from "./src/save-star-web";

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
        <MockBookmarksProvider
          articleId="5504b5a8-b1c0-11e8-a553-a0ee9be48bc6"
          delay={1000}
        >
          <TcView style={styles.star}>
            <SaveStarWeb
              colour={colours.functional.secondary}
              hoverColour={colours.functional.brandColour}
              articleId="5504b5a8-b1c0-11e8-a553-a0ee9be48bc6"
            />
          </TcView>
        </MockBookmarksProvider>
      ),
      name: "SaveStarWeb",
      type: "story"
    }
  ],
  name: "Primitives/SaveStarWeb"
};

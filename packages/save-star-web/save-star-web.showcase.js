import React from "react";
import SaveStarWeb from "./src/save-star-web";
import mockSaveApi from "./src/mock-save-api";

export default {
  children: [
    {
      component: () => (
        <SaveStarWeb articleId="123" saveApi={mockSaveApi} />
      ),
      name: "SaveStarWeb",
      type: "story"
    }
  ],
  name: "Primitives/SaveStarWeb"
};

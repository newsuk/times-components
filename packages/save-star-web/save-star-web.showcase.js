import React from "react";
import SaveStarWeb from "./src/save-star-web";
import mockSaveApi from "./mock-save-api-showcase";

export default {
  children: [
    {
      component: () => (
        <SaveStarWeb
          articleId="5504b5a8-b1c0-11e8-a553-a0ee9be48bc6"
          saveApi={mockSaveApi}
        />
      ),
      name: "SaveStarWeb",
      type: "story"
    }
  ],
  name: "Primitives/SaveStarWeb"
};

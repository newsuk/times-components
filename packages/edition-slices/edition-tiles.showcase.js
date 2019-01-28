import React from "react";
import { mockLeadOneFullWidthSlice } from "@times-components/fixture-generator";
import { PrimaryTile } from "./src/tiles";

export default {
  children: [
    {
      component: () => {
        const slice = mockLeadOneFullWidthSlice();
        return <PrimaryTile tile={slice.lead} withImage withSummaryMargins />;
      },
      name: "Primary (with image, with summary margins)",
      type: "story"
    },
    {
      component: () => {
        const slice = mockLeadOneFullWidthSlice();
        return <PrimaryTile tile={slice.lead} withSummaryMargins />;
      },
      name: "Primary (without image, with summary margins)",
      type: "story"
    }
  ],
  name: "Composed/Edition/Tiles"
};

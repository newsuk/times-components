import React from "react";
import { mockEditionSlice } from "@times-components/fixture-generator";
import { PrimaryTile } from "./src/tiles";

export default {
  children: [
    {
      component: () => {
        const slice = mockEditionSlice("LeadOneFullWidthSlice");
        return <PrimaryTile tile={slice.lead} withImage />;
      },
      name: "Primary (with image)",
      type: "story"
    },
    {
      component: () => {
        const slice = mockEditionSlice("LeadOneFullWidthSlice");
        return <PrimaryTile tile={slice.lead} />;
      },
      name: "Primary (without image)",
      type: "story"
    }
  ],
  name: "Composed/Edition/Tiles"
};

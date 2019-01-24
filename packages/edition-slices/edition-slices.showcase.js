import React from "react";
import { LeadOneFullWidthSlice, LeadOneAndOneSlice } from "./src/slices";
import leadOneAndOneDataGenerator from "./fixtures/leadoneandone";

const leadOneAndOneData = leadOneAndOneDataGenerator();

export default {
  children: [
    {
      component: () => <LeadOneFullWidthSlice lead={leadOneAndOneData.lead} />,
      name: "Lead One Full Width",
      type: "story"
    },
    {
      component: () => (
        <LeadOneAndOneSlice
          lead={leadOneAndOneData.lead}
          support={leadOneAndOneData.support}
        />
      ),
      name: "Lead One And One",
      type: "story"
    }
  ],
  name: "Composed/Edition/Slices"
};

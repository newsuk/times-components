import React from "react";
import { LeadOneFullWidthSlice, LeadOneAndOneSlice } from "./src/article-slice";
import leadOneAndOneData from "./leadoneandone";

export default {
  children: [
    {
      component: () => <LeadOneFullWidthSlice lead={leadOneAndOneData.lead} />,
      name: "Lead One Full Width",
      type: "story"
    },
    {
      component: () => <LeadOneAndOneSlice lead={leadOneAndOneData.lead} support={leadOneAndOneData.support} />,
      name: "Lead One And One",
      type: "story"
    }
  ],
  name: "Edition/Slices"
};

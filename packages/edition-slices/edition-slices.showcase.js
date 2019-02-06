import React from "react";
import {
  mockLeadOneFullWidthSlice,
  mockLeadOneAndOneSlice,
  mockSecondaryOneSlice,
  mockSecondaryFourSlice,
  mockList2AndSixNoPicSlice
} from "@times-components/fixture-generator";
import {
  LeadOneFullWidthSlice,
  LeadOneAndOneSlice,
  SecondaryOneSlice,
  SecondaryFourSlice,
  SecondaryTwoNoPicAndTwoSlice,
  ListTwoAndSixNoPicSlice
} from "./src/slices";

export default {
  children: [
    {
      component: () => {
        const slice = mockLeadOneFullWidthSlice();
        return <LeadOneFullWidthSlice lead={slice.lead} onPress={() => {}} />;
      },
      name: "Lead One Full Width (A)",
      type: "story"
    },
    {
      component: () => {
        const slice = mockLeadOneAndOneSlice();
        return (
          <LeadOneAndOneSlice
            lead={slice.lead}
            onPress={() => {}}
            support={slice.support}
          />
        );
      },
      name: "Lead One And One (AB)",
      type: "story"
    },
    {
      component: () => {
        const slice = mockSecondaryOneSlice();
        return (
          <SecondaryOneSlice onPress={() => {}} secondary={slice.secondary} />
        );
      },
      name: "Secondary One (A)",
      type: "story"
    },
    {
      component: () => {
        const slice = mockSecondaryFourSlice();
        return (
          <SecondaryFourSlice
            onPress={() => {}}
            secondary1={slice.secondary1}
            secondary2={slice.secondary2}
            secondary3={slice.secondary3}
            secondary4={slice.secondary4}
          />
        );
      },
      name: "Secondary Four (CCCC)",
      type: "story"
    },
    {
      component: () => {
        const slice = mockSecondaryFourSlice();
        return (
          <SecondaryTwoNoPicAndTwoSlice
            onPress={() => {}}
            secondary1={slice.secondary1}
            secondary2={slice.secondary2}
            support1={slice.secondary3}
            support2={slice.secondary4}
          />
        );
      },
      name: "Secondary Two No Pic And Two (BBGG)",
      type: "story"
    },
    {
      component: () => {
        const slice = mockList2AndSixNoPicSlice();
        return (
          <ListTwoAndSixNoPicSlice
            lead1={slice.lead1}
            lead2={slice.lead2}
            onPress={() => {}}
            support1={slice.support1}
            support2={slice.support2}
            support3={slice.support3}
            support4={slice.support4}
            support5={slice.support5}
            support6={slice.support6}
          />
        );
      },
      name: "List Two And Six No Pic Four (CCLLLLLL)",
      type: "story"
    }
  ],
  name: "Composed/Edition/Slices"
};

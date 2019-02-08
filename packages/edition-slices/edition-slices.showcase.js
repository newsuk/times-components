import React from "react";
import { ScrollView } from "react-native";
import {
  mockLeadOneFullWidthSlice,
  mockLeadOneAndOneSlice,
  mockSecondaryOneSlice,
  mockSecondaryFourSlice,
  mockList2AndSixNoPicSlice
} from "@times-components/fixture-generator";
import {
  LeadOneAndFourSlice,
  LeadOneAndOneSlice,
  LeadOneFullWidthSlice,
  ListTwoAndSixNoPicSlice,
  SecondaryOneSlice,
  SecondaryFourSlice,
  SecondaryTwoAndTwoSlice,
  SecondaryTwoNoPicAndTwoSlice
} from "./src/slices";

export default {
  children: [
    {
      component: () => {
        const slice = mockList2AndSixNoPicSlice();
        return (
          <ScrollView>
            <LeadOneAndFourSlice
              lead={slice.support5}
              onPress={() => {}}
              support1={slice.support1}
              support2={slice.support2}
              support3={slice.support3}
              support4={slice.support4}
            />
          </ScrollView>
        );
      },
      name: "Lead One And Four (IJJJJ)",
      type: "story"
    },
    {
      component: () => {
        const slice = mockLeadOneAndOneSlice();
        return (
          <ScrollView>
            <LeadOneAndOneSlice
              lead={slice.lead}
              onPress={() => {}}
              support={slice.support}
            />
          </ScrollView>
        );
      },
      name: "Lead One And One (AB)",
      type: "story"
    },
    {
      component: () => {
        const slice = mockLeadOneFullWidthSlice();
        return (
          <ScrollView>
            <LeadOneFullWidthSlice lead={slice.lead} onPress={() => {}} />
          </ScrollView>
        );
      },
      name: "Lead One Full Width (A)",
      type: "story"
    },
    {
      component: () => {
        const slice = mockSecondaryOneSlice();
        return (
          <ScrollView>
            <SecondaryOneSlice onPress={() => {}} secondary={slice.secondary} />
          </ScrollView>
        );
      },
      name: "Secondary One (A)",
      type: "story"
    },
    {
      component: () => {
        const slice = mockSecondaryFourSlice();
        return (
          <ScrollView>
            <SecondaryFourSlice
              onPress={() => {}}
              secondary1={slice.secondary1}
              secondary2={slice.secondary2}
              secondary3={slice.secondary3}
              secondary4={slice.secondary4}
            />
          </ScrollView>
        );
      },
      name: "Secondary Four (CCCC)",
      type: "story"
    },
    {
      component: () => {
        const slice = mockSecondaryFourSlice();
        return (
          <ScrollView>
            <SecondaryTwoAndTwoSlice
              onPress={() => {}}
              secondary1={slice.secondary1}
              secondary2={slice.secondary2}
              support1={slice.secondary3}
              support2={slice.secondary4}
            />
          </ScrollView>
        );
      },
      name: "Secondary Two And Two (CCGG)",
      type: "story"
    },
    {
      component: () => {
        const slice = mockSecondaryFourSlice();
        return (
          <ScrollView>
            <SecondaryTwoNoPicAndTwoSlice
              onPress={() => {}}
              secondary1={slice.secondary1}
              secondary2={slice.secondary2}
              support1={slice.secondary3}
              support2={slice.secondary4}
            />
          </ScrollView>
        );
      },
      name: "Secondary Two No Pic And Two (BBGG)",
      type: "story"
    },
    {
      component: () => {
        const slice = mockList2AndSixNoPicSlice();
        return (
          <ScrollView>
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
          </ScrollView>
        );
      },
      name: "List Two And Six No Pic Four (CCLLLLLL)",
      type: "story"
    }
  ],
  name: "Composed/Edition/Slices"
};

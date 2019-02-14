import React from "react";
import { ScrollView } from "react-native";
import {
  mockLeadOneAndFourSlice,
  mockLeadOneFullWidthSlice,
  mockLeadOneAndOneSlice,
  mockLeadTwoNoPicAndTwoSlice,
  mockLeadersSlice,
  mockSecondaryOneSlice,
  mockSecondaryFourSlice,
  mockListTwoAndSixNoPicSlice,
  mockSecondaryTwoAndTwoSlice,
  mockSecondaryTwoNoPicAndTwoSlice
} from "@times-components/fixture-generator";
import {
  LeadOneAndFourSlice,
  LeadOneAndOneSlice,
  LeadOneFullWidthSlice,
  LeadTwoNoPicAndTwoSlice,
  ListTwoAndSixNoPicSlice,
  SecondaryOneSlice,
  SecondaryFourSlice,
  SecondaryTwoAndTwoSlice,
  SecondaryTwoNoPicAndTwoSlice,
  LeadersSlice
} from "./src/slices";

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);

export default {
  children: [
    {
      component: (_, { decorateAction }) => (
        <ScrollView>
          <LeadOneAndFourSlice
            onPress={preventDefaultedAction(decorateAction)("onPress")}
            slice={mockLeadOneAndFourSlice()}
          />
        </ScrollView>
      ),
      name: "Lead One And Four (IJJJJ)",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => (
        <ScrollView>
          <LeadOneAndOneSlice
            onPress={preventDefaultedAction(decorateAction)("onPress")}
            slice={mockLeadOneAndOneSlice()}
          />
        </ScrollView>
      ),
      name: "Lead One And One (AB)",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => (
        <ScrollView>
          <LeadOneFullWidthSlice
            onPress={preventDefaultedAction(decorateAction)("onPress")}
            slice={mockLeadOneFullWidthSlice()}
          />
        </ScrollView>
      ),
      name: "Lead One Full Width (A)",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => (
        <ScrollView>
          <LeadTwoNoPicAndTwoSlice
            onPress={preventDefaultedAction(decorateAction)("onPress")}
            slice={mockLeadTwoNoPicAndTwoSlice()}
          />
        </ScrollView>
      ),
      name: "Lead Two no pic and Two (FBDE)",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => (
        <ScrollView>
          <SecondaryOneSlice
            onPress={preventDefaultedAction(decorateAction)("onPress")}
            slice={mockSecondaryOneSlice()}
          />
        </ScrollView>
      ),
      name: "Secondary One (A)",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => (
        <ScrollView>
          <SecondaryFourSlice
            onPress={preventDefaultedAction(decorateAction)("onPress")}
            slice={mockSecondaryFourSlice()}
          />
        </ScrollView>
      ),
      name: "Secondary Four (CCCC)",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => (
        <ScrollView>
          <SecondaryTwoAndTwoSlice
            onPress={preventDefaultedAction(decorateAction)("onPress")}
            slice={mockSecondaryTwoAndTwoSlice()}
          />
        </ScrollView>
      ),
      name: "Secondary Two And Two (CCGG)",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => (
        <ScrollView>
          <SecondaryTwoNoPicAndTwoSlice
            onPress={preventDefaultedAction(decorateAction)("onPress")}
            slice={mockSecondaryTwoNoPicAndTwoSlice()}
          />
        </ScrollView>
      ),
      name: "Secondary Two No Pic And Two (BBGG)",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => (
        <ScrollView>
          <ListTwoAndSixNoPicSlice
            onPress={preventDefaultedAction(decorateAction)("onPress")}
            slice={mockListTwoAndSixNoPicSlice()}
          />
        </ScrollView>
      ),
      name: "List Two And Six No Pic Four (CCLLLLLL)",
      type: "story"
    },
    {
      component: () => (
        <ScrollView>
          <LeadersSlice onPress={() => {}} slice={mockLeadersSlice()} />
        </ScrollView>
      ),
      name: "Leaders (MMMM)",
      type: "story"
    }
  ],
  name: "Composed/Edition/Slices"
};

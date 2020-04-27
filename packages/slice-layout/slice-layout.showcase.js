/* eslint-disable react/prop-types */
import React from "react";
import { ScrollView, View } from "react-native";
import { editionBreakpoints } from "@times-components/styleguide";

import {
  VerticalLayout,
  CommentLeadAndCartoon,
  LeadOneAndFourSlice,
  LeadOneAndOneSlice,
  LeadOneAndTwoSlice,
  LeadTwoNoPicAndTwoSlice,
  OpinionOneAndTwoSlice,
  StandardSlice,
  SecondaryFourSlice,
  SecondaryOneAndColumnistSlice,
  SecondaryOneAndFourSlice,
  SecondaryTwoAndTwoSlice,
  SecondaryTwoNoPicAndTwoSlice,
  Leaders,
  ListTwoAndSixNoPic
} from "./src/slice-layout";

const colours = [
  { backgroundColor: "yellow", id: 1 },
  { backgroundColor: "green", id: 2 },
  { backgroundColor: "red", id: 3 },
  { backgroundColor: "blue", id: 4 }
];

const createItems = noOfItems =>
  colours
    .map(colour => {
      const { backgroundColor, id } = colour;
      if (id > noOfItems) return false;
      return (
        <View
          id={`item-${id}`}
          style={[{ minHeight: 150 }, { backgroundColor }]}
        />
      );
    })
    .filter(item => item !== false);

const Support1 = () => (
  <View style={[{ minHeight: 150 }, { backgroundColor: "green" }]} />
);

const Support2 = () => (
  <View style={[{ minHeight: 150 }, { backgroundColor: "yellow" }]} />
);

const Support3 = () => (
  <View style={[{ minHeight: 150 }, { backgroundColor: "red" }]} />
);

const Support4 = () => (
  <View style={[{ minHeight: 150 }, { backgroundColor: "blue" }]} />
);

const breakpointSelect = select =>
  select("Breakpoints:", editionBreakpoints, "small");

export default {
  children: [
    {
      component: () => (
        <ScrollView>
          <VerticalLayout
            tiles={[
              <Support1 tileName="support1" />,
              <Support2 tileName="support2" />
            ]}
          />
        </ScrollView>
      ),
      name: "Vertical Layout",
      type: "story",
      platform: "native"
    },
    {
      component: ({ select }) => (
        <ScrollView>
          <LeadOneAndFourSlice
            breakpoint={breakpointSelect(select)}
            lead={<Support3 tileName="lead1" />}
            support1={<Support1 tileName="support2" />}
            support2={<Support2 tileName="support3" />}
            support3={<Support3 tileName="support4" />}
            support4={<Support4 tileName="support5" />}
          />
        </ScrollView>
      ),
      name: "LeadOneAndFour",
      type: "story",
      platform: "native"
    },
    {
      component: ({ select }) => (
        <ScrollView>
          <LeadOneAndOneSlice
            breakpoint={breakpointSelect(select)}
            lead={
              <View
                id="lead"
                style={{
                  backgroundColor: "red",
                  minHeight: 320
                }}
                tileName="lead"
              />
            }
            support={<Support1 tileName="support1" />}
          />
        </ScrollView>
      ),
      name: "LeadOneAndOne",
      type: "story",
      platform: "native"
    },
    {
      component: () => (
        <ScrollView>
          <LeadOneAndTwoSlice
            renderLead={() => (
              <View
                id="lead"
                style={{
                  backgroundColor: "red",
                  minHeight: 320
                }}
              />
            )}
            renderSupport1={() => null}
            renderSupport2={() => null}
          />
        </ScrollView>
      ),
      name: "LeadOneAndTwo",
      type: "story",
      platform: "native"
    },
    {
      component: () => (
        <ScrollView>
          <LeadOneAndTwoSlice
            renderLead={() => (
              <View
                id="lead"
                style={{
                  backgroundColor: "red",
                  minHeight: 320
                }}
              />
            )}
            renderSupport1={() => <Support1 />}
            renderSupport2={() => null}
          />
        </ScrollView>
      ),
      name: "LeadOneAndTwo With 1 Support",
      type: "story",
      platform: "native"
    },
    {
      component: () => (
        <ScrollView>
          <LeadOneAndTwoSlice
            renderLead={() => (
              <View
                id="lead"
                style={{
                  backgroundColor: "red",
                  minHeight: 320
                }}
              />
            )}
            renderSupport1={() => <Support1 />}
            renderSupport2={() => <Support2 />}
          />
        </ScrollView>
      ),
      name: "LeadOneAndTwo With 2 Supports",
      type: "story",
      platform: "native"
    },
    {
      component: () => (
        <ScrollView>
          <OpinionOneAndTwoSlice
            renderOpinion={() => (
              <View
                id="opinion"
                style={{
                  backgroundColor: "red",
                  minHeight: 150
                }}
              />
            )}
            renderSupport1={() => null}
            renderSupport2={() => null}
          />
        </ScrollView>
      ),
      name: "OpinionOneAndTwo",
      type: "story",
      platform: "native"
    },
    {
      component: () => (
        <ScrollView>
          <OpinionOneAndTwoSlice
            renderOpinion={() => (
              <View
                id="opinion"
                style={{
                  backgroundColor: "red",
                  minHeight: 150
                }}
              />
            )}
            renderSupport1={() => <Support1 />}
            renderSupport2={() => null}
          />
        </ScrollView>
      ),
      name: "OpinionOneAndTwo With 1 Support",
      type: "story",
      platform: "native"
    },
    {
      component: () => (
        <ScrollView>
          <OpinionOneAndTwoSlice
            renderOpinion={() => (
              <View
                id="opinion"
                style={{
                  backgroundColor: "red",
                  minHeight: 150
                }}
              />
            )}
            renderSupport1={() => <Support1 />}
            renderSupport2={() => <Support2 />}
          />
        </ScrollView>
      ),
      name: "OpinionOneAndTwo With 2 Supports",
      type: "story",
      platform: "native"
    },
    {
      component: ({ select }) => (
        <ScrollView>
          <SecondaryFourSlice
            breakpoint={breakpointSelect(select)}
            secondary1={<Support1 tileName="secondary1" />}
            secondary2={<Support2 tileName="secondary2" />}
            secondary3={<Support3 tileName="secondary3" />}
            secondary4={<Support4 tileName="secondary4" />}
          />
        </ScrollView>
      ),
      name: "SecondaryFourSlice",
      type: "story",
      platform: "native"
    },
    {
      component: ({ select }) => (
        <ScrollView>
          <SecondaryTwoAndTwoSlice
            breakpoint={breakpointSelect(select)}
            secondary1={<Support1 tileName="secondary1" />}
            secondary2={<Support2 tileName="secondary2" />}
            support1={<Support3 tileName="support1" />}
            support2={<Support4 tileName="support2" />}
            support3={<Support1 tileName="support3" />}
            support4={<Support2 tileName="support4" />}
          />
        </ScrollView>
      ),
      name: "SecondaryTwoAndTwoSlice",
      type: "story",
      platform: "native"
    },
    {
      component: ({ select }) => (
        <ScrollView>
          <SecondaryOneAndFourSlice
            breakpoint={breakpointSelect(select)}
            secondary={<Support1 tileName="secondary1" />}
            support1={<Support2 tileName="support1" />}
            support2={<Support3 tileName="support2" />}
            support3={<Support4 tileName="support3" />}
            support4={<Support1 tileName="support4" />}
          />
        </ScrollView>
      ),
      name: "SecondaryOneAndFourSlice",
      type: "story",
      platform: "native"
    },
    {
      component: ({ select }) => (
        <ScrollView>
          <SecondaryTwoNoPicAndTwoSlice
            breakpoint={breakpointSelect(select)}
            secondary1={<Support1 tileName="secondary1" />}
            secondary2={<Support2 tileName="secondary2" />}
            support1={<Support3 tileName="support3" />}
            support2={<Support4 tileName="support4" />}
          />
        </ScrollView>
      ),
      name: "SecondaryTwoNoPicAndTwoSlice",
      type: "story",
      platform: "native"
    },
    {
      component: ({ select }) => (
        <ScrollView>
          <LeadTwoNoPicAndTwoSlice
            breakpoint={breakpointSelect(select)}
            lead1={<Support1 tileName="lead1" />}
            lead2={<Support2 tileName="lead2" />}
            support1={<Support3 tileName="support1" />}
            support2={<Support4 tileName="support2" />}
          />
        </ScrollView>
      ),
      name: "LeadTwoNoPicAndTwoSlice",
      type: "story",
      platform: "native"
    },
    {
      component: ({ select }) => (
        <ScrollView>
          <ListTwoAndSixNoPic
            breakpoint={breakpointSelect(select)}
            lead1={<Support3 tileName="lead1" />}
            lead2={<Support4 tileName="lead2" />}
            support1={<Support1 tileName="support1" />}
            support2={<Support2 tileName="support2" />}
            support3={<Support3 tileName="support3" />}
            support4={<Support4 tileName="support4" />}
            support5={<Support1 tileName="support5" />}
            support6={<Support2 tileName="support6" />}
          />
        </ScrollView>
      ),
      name: "ListTwoAndSixNoPic",
      type: "story",
      platform: "native"
    },
    {
      component: ({ select }) => (
        <ScrollView>
          <Leaders
            breakpoint={breakpointSelect(select)}
            leader1={<Support1 tileName="lead1" />}
            leader2={<Support2 tileName="lead2" />}
            leader3={<Support3 tileName="lead3" />}
          />
        </ScrollView>
      ),
      name: "Leaders",
      type: "story",
      platform: "native"
    },
    {
      component: ({ select }) => (
        <ScrollView>
          <CommentLeadAndCartoon
            breakpoint={breakpointSelect(select)}
            cartoon={<Support2 tileName="cartoon" />}
            lead={<Support1 tileName="lead" />}
          />
        </ScrollView>
      ),
      name: "CommentLeadAndCartoon",
      type: "story",
      platform: "native"
    },
    {
      component: ({ select }) => (
        <ScrollView>
          <SecondaryOneAndColumnistSlice
            breakpoint={breakpointSelect(select)}
            columnist={<Support1 tileName="support1" />}
            secondary={<Support2 tileName="support2" />}
          />
        </ScrollView>
      ),
      name: "SecondaryOneAndColumnistSlice",
      type: "story",
      platform: "native"
    },
    {
      component: ({ select }) => {
        const itemCount = {
          0: "0",
          1: "1",
          2: "2",
          3: "3"
        };

        return (
          <ScrollView>
            <StandardSlice
              itemCount={Number(select("Number of items:", itemCount, "3"))}
              renderItems={() =>
                createItems(select("Number of items:", itemCount, "3"))
              }
            />
          </ScrollView>
        );
      },
      name: "Standard",
      type: "story"
    }
  ],
  name: "Primitives/Slice Layout"
};

/* eslint-disable react/prop-types */
import React from "react";
import { ScrollView, View } from "react-native";
import LeadOneAndTwoSlice from "./src/templates/leadoneandtwo";
import OpinionOneAndTwoSlice from "./src/templates/opiniononeandtwo";
import StandardSlice from "./src/templates/standard";

const colours = [
  { backgroundColor: "yellow", id: 1 },
  { backgroundColor: "green", id: 2 },
  { backgroundColor: "red", id: 3 }
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
  <View
    id="support1"
    style={[{ minHeight: 150 }, { backgroundColor: "green" }]}
  />
);

const Support2 = () => (
  <View
    id="support2"
    style={[{ minHeight: 150 }, { backgroundColor: "yellow" }]}
  />
);

export default {
  children: [
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
      type: "story"
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
      type: "story"
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
      type: "story"
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
      type: "story"
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
      type: "story"
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
      type: "story"
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
  name: "Primitives/Slice"
};

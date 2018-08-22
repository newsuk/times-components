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

export default {
  name: "Primitives/Slice",
  children: [
    {
      type: "story",
      name: "LeadOneAndTwo",
      component: ({ select }) => {
        const itemCount = {
          0: "0",
          1: "1",
          2: "2"
        };

        return (
          <ScrollView>
            <LeadOneAndTwoSlice
              lead={() => (
                <View
                  id="lead"
                  style={{
                    backgroundColor: "red",
                    minHeight: 320
                  }}
                />
              )}
              renderSupports={() =>
                createItems(select("Number of support items:", itemCount, 0))
              }
            />
          </ScrollView>
        );
      }
    },
    {
      type: "story",
      name: "OpinionOneAndTwo",
      component: ({ select }) => {
        const itemCount = {
          0: "0",
          1: "1",
          2: "2"
        };

        return (
          <ScrollView>
            <OpinionOneAndTwoSlice
              opinion={() => (
                <View
                  id="opinion"
                  style={{
                    minHeight: 150,
                    backgroundColor: "red"
                  }}
                />
              )}
              renderSupports={() =>
                createItems(select("Number of support items:", itemCount, 0))
              }
            />
          </ScrollView>
        );
      }
    },
    {
      type: "story",
      name: "Standard",
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
              itemCount={Number(select("Number of items:", itemCount, 3))}
              renderItems={() =>
                createItems(select("Number of items:", itemCount, 3))
              }
            />
          </ScrollView>
        );
      }
    }
  ]
};

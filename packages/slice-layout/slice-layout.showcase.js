/* eslint-disable react/prop-types */
import React from "react";
import { TcView } from "@times-components/utils";

import { StandardSlice } from "./src/slice-layout";

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
        <TcView id={`item-${id}`} style={{ minHeight: 150, backgroundColor }} />
      );
    })
    .filter(item => item !== false);

export default {
  children: [
    {
      component: ({ select }) => {
        const itemCount = {
          0: "0",
          1: "1",
          2: "2",
          3: "3"
        };

        return (
          <TcView>
            <StandardSlice
              itemCount={Number(select("Number of items:", itemCount, "3"))}
              renderItems={() =>
                createItems(select("Number of items:", itemCount, "3"))
              }
            />
          </TcView>
        );
      },
      name: "Standard",
      type: "story"
    }
  ],
  name: "Primitives/Slice Layout"
};

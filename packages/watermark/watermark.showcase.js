/* eslint-disable react/prop-types */
import React from "react";
import Watermark from "./src/watermark";

export default {
  children: [
    {
      component: ({ number }) => (
        <Watermark
          height={number("Height: ", 250)}
          width={number("Width: ", 300)}
        />
      ),
      name: "MPU",
      type: "story"
    },
    {
      component: () => (
        <Watermark height={250} viewBox="0 0 1000 300" width={970} />
      ),
      name: "Full",
      type: "story"
    }
  ],
  name: "Primitives/Watermark"
};

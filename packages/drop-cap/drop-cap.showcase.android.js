/* eslint-disable react/prop-types */
import React from "react";
import Context from "@times-components/context";
import { scales } from "@times-components/styleguide";
import DropCap from "./src/drop-cap";

const selectScales = select => select("Scale", scales, scales.medium);

export default {
  name: "Composed/DropCap",
  children: [
    {
      type: "story",
      name: "Simple dropCap",
      component: ({ select }) => {
        const scale = selectScales(select);
        return (
          <Context.Provider value={{ theme: { scale } }}>
            <DropCap
              dropCap="I"
              text="n 1924 Harold Macmillan became MP for Stockton-on-Tees. Witnessing brutal poverty there between the wars, he said later that he had learnt “lessons which I have never forgotten. If, in some respects, they may have left too deep an impression on my mind, the gain was greater than the loss.” The gain was a lifelong conviction that the central aim of domestic policy must be to avoid the horror of mass unemployment. Forget ideological posturing; the job of a responsible Conservative government was to keep people in work."
            />
          </Context.Provider>
        );
      }
    },
    {
      type: "story",
      name: "Multi character dropCap",
      component: ({ select }) => {
        const scale = selectScales(select);
        return (
          <Context.Provider value={{ theme: { scale } }}>
            <DropCap
              dropCap="&quot;Q"
              text="q 1924&quot; Harold Macmillan became MP for Stockton-on-Tees. Witnessing brutal poverty there between the wars, he said later that he had learnt “lessons which I have never forgotten. If, in some respects, they may have left too deep an impression on my mind, the gain was greater than the loss.” The gain was a lifelong conviction that the central aim of domestic policy must be to avoid the horror of mass unemployment. Forget ideological posturing; the job of a responsible Conservative government was to keep people in work."
            />
          </Context.Provider>
        );
      }
    },
    {
      type: "story",
      name: "DropCap with short text",
      component: ({ select }) => {
        const scale = selectScales(select);
        return (
          <Context.Provider value={{ theme: { scale } }}>
            <DropCap
              dropCap="I"
              text="n 1924&quot; Harold Macmillan became MP for Stockton-on-Tees."
            />
          </Context.Provider>
        );
      }
    }
  ]
};

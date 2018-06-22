import React from "react";
import AdPlaceholder from "./src/ad-placeholder";

export default {
  name: "Primitives/Advertisement Placeholder",
  children: [
    {
      type: "story",
      name: "AdPlaceholder (300x250 - MPU)",
      component: () => <AdPlaceholder width={300} height={250} />
    },
    {
      type: "story",
      name: "AdPlaceholder (728x90 - Default)",
      component: () => <AdPlaceholder width={728} height={90} />
    },
    {
      type: "story",
      name: "AdPlaceholder (970x250 - Billboard)",
      component: () => <AdPlaceholder width={970} height={250} />
    }
  ]
};

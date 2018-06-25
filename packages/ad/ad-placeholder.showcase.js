import React from "react";
import AdPlaceholder from "./src/ad-placeholder";

const sizes = ["mpu", "default", "billboard"];

const renderAdPlaceholder = size => {
  if (size === sizes[1]) return <AdPlaceholder width={728} height={90} />;
  if (size === sizes[2]) return <AdPlaceholder width={970} height={250} />;

  return <AdPlaceholder width={300} height={250} />;
};

export default {
  name: "Primitives/Advertisement Placeholder",
  children: [
    {
      type: "story",
      name: "AdPlaceholder",
      component: ({ selectV2 }) =>
        renderAdPlaceholder(
          selectV2("Size of ad placeholder:", sizes, sizes[0])
        )
    }
  ]
};

import React from "react";
import StandardPuff from "./standard-puff";

export default {
  children: [
    {
      component: () =>
      (
        <StandardPuff
          analyticsStream={() => {}}
          label="Hi Bibi"
          image="https://nuk-tnl-deck-prod-static.s3-eu-west-1.amazonaws.com/uploads/b309b4cc1fe7a2d9a940f93e29701615.jpg"
        />
      ),
      name: "Standard Puff",
      type: "story"
    }
  ],
  name: "Primitives/Standard Puff"
};

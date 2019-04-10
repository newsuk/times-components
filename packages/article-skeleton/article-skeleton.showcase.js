import React from "react";
import { MockedProvider } from "@times-components/provider-test-tools";
import renderArticleSkeleton from "./showcase-helper";

export default {
  children: [
    {
      // eslint-disable-next-line react/prop-types
      component: ({ boolean, select }, { decorateAction }) => (
        <MockedProvider mocks={[]}>
          {renderArticleSkeleton({
            boolean,
            decorateAction,
            hasScaling: true,
            select
          })}
        </MockedProvider>
      ),
      name: "Default",
      platform: "native",
      type: "story"
    }
  ],
  name: "Composed/Article Skeleton"
};

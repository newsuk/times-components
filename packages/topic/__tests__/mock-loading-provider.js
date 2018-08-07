/* eslint-disable react/prop-types */

import React from "react";

export const TopicArticlesProvider = ({ children }) => (
  <topicArticlesProvider>
    {children({
      isLoading: true,
      variables: {}
    })}
  </topicArticlesProvider>
);

export default "Provider";

/* eslint-disable react/prop-types, import/prefer-default-export */
import React from "react";

export const ArticleCommentsProvider = ({ children }) => (
  <articleCommentsProvider>
    {children({
      error: { error: "Error" },
      refetch: () => {},
      variables: {}
    })}
  </articleCommentsProvider>
);

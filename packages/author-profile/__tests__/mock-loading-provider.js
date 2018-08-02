/* eslint-disable react/prop-types */

import React from "react";

export const AuthorArticlesNoImagesProvider = ({ children }) => (
  <authorArticlesNoImagesProvider>
    {children({
      isLoading: true,
      variables: {}
    })}
  </authorArticlesNoImagesProvider>
);

export const AuthorArticlesWithImagesProvider = ({ children }) => (
  <authorArticlesWithImagesProvider>
    {children({
      isLoading: true,
      variables: {}
    })}
  </authorArticlesWithImagesProvider>
);

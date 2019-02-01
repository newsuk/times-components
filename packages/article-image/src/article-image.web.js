import React from "react";
import ArticleImage from "./article-image.base";

const ArticleImageWeb = ({
  imageOptions: { display, ...options },
  ...props
}) => (
  <ArticleImage
    {...props}
    imageOptions={{
      ...options,
      display: display === "fullwidth" ? "primary" : display
    }}
  />
);

export default ArticleImageWeb;

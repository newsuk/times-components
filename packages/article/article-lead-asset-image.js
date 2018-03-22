import React from "react";
import Image from "@times-components/image";

const ArticleLeadAssetImage = ({ crop: { ratio, url } }) => {
  const [ratioWidth, ratioHeight] = ratio.split(":");
  const aspectRatio = ratioWidth / ratioHeight;

  return <Image uri={url} aspectRatio={aspectRatio} />;
};

export default ArticleLeadAssetImage;

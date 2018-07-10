import React from "react";
import ArticleLabel from "@times-components/article-label";
import VideoLabel from "@times-components/video-label";
import { colours } from "@times-components/styleguide";
import styles from "../styles/article-header";

export default render => ({ isVideo, label }) => {
  if (!isVideo && !label) return null;

  const Label = isVideo ? VideoLabel : ArticleLabel;

  return render(
    {
      accessibilityLabel: "label",
      testID: "label",
      style: styles.articleLabel
    },
    <Label color={colours.section.default} title={label} />
  );
};

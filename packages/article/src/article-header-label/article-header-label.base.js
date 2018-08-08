import React from "react";
import ArticleLabel from "@times-components/article-label";
import VideoLabel from "@times-components/video-label";
import styles from "../styles/article-header";

export default render => ({ isVideo, label, color }) => {
  if (!isVideo && !label) return null;

  const Label = isVideo ? VideoLabel : ArticleLabel;

  return render(
    {
      accessibilityLabel: "label",
      testID: "label",
      style: styles.articleLabel
    },
    <Label color={color} title={label} />
  );
};

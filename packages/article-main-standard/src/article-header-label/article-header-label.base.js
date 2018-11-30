import React from "react";
import ArticleLabel, { LabelWithTheme } from "@times-components/article-label";
import VideoLabel from "@times-components/video-label";
import styles from "../styles/article-header";

export default render => ({ isVideo, label }) => {
  if (!isVideo && !label) return null;

  return render(
    {
      style: styles.articleLabel,
      testID: "label"
    },
    <LabelWithTheme
      label={label}
      LabelComponent={isVideo ? VideoLabel : ArticleLabel}
    />
  );
};

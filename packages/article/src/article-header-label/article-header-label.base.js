import React from "react";
import ArticleLabel from "@times-components/article-label";
import Context from "@times-components/context";
import VideoLabel from "@times-components/video-label";
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
    <Context.Consumer>
      {({ theme: { sectionColour } }) => (
        <Label color={sectionColour} title={label} />
      )}
    </Context.Consumer>
  );
};

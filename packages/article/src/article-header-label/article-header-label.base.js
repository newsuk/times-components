import React from "react";
import ArticleLabel from "@times-components/article-label";
import Context from "@times-components/context";
import { colours } from "@times-components/styleguide";
import VideoLabel from "@times-components/video-label";
import styles from "../styles/article-header";

export default render => ({ isVideo, label }) => {
  if (!isVideo && !label) return null;

  const Label = isVideo ? VideoLabel : ArticleLabel;

  return render(
    {
      style: styles.articleLabel,
      testID: "label"
    },
    <Context.Consumer>
      {({ theme: { sectionColour } }) => (
        <Label color={sectionColour || colours.section.default} title={label} />
      )}
    </Context.Consumer>
  );
};

import React from "react";
import ArticleLabel from "@times-components/article-label";
import Context from "@times-components/context";
import { colours } from "@times-components/styleguide";
import VideoLabel from "@times-components/video-label";
import styles from "../styles/article-header";

export default render => ({ hasVideo, label }) => {
  if (!hasVideo && !label) return null;

  const Label = hasVideo ? VideoLabel : ArticleLabel;

  return render(
    {
      testID: "label",
      style: styles.articleLabel
    },
    <Context.Consumer>
      {({ theme: { sectionColour } }) => (
        <Label color={sectionColour || colours.section.default} title={label} />
      )}
    </Context.Consumer>
  );
};

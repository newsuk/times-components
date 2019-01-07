import React from "react";
import { View } from "react-native";
import ArticleLabel from "@times-components/article-label";
import VideoLabel from "@times-components/video-label";
import Context from "@times-components/context";
import { colours } from "@times-components/styleguide";

import {
  articleLabelPropTypes,
  articleLabelDefaultProps
} from "./article-label-prop-types";
import styles from "../styles";

const HeaderLabel = ({ isVideo, label }) => {
  if (!isVideo && !label) return null;

  const Label = isVideo ? VideoLabel : ArticleLabel;

  return (
    <Context.Consumer>
      {({ theme: { sectionColour } }) => (
        <View style={styles.label}>
          <Label
            color={sectionColour || colours.section.default}
            title={label}
          />
        </View>
      )}
    </Context.Consumer>
  );
};

HeaderLabel.propTypes = articleLabelPropTypes;
HeaderLabel.defaultProps = articleLabelDefaultProps;

export default HeaderLabel;

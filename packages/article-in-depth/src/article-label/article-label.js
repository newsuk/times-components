import React from "react";
import { View } from "react-native";
import ArticleLabel from "@times-components/article-label";
import VideoLabel from "@times-components/video-label";
import { colours } from "@times-components/styleguide";

import {
  articleLabelPropTypes,
  articleLabelDefaultProps
} from "./article-label-prop-types";
import styles from "../styles";

const HeaderLabel = ({ color, isVideo, label }) => {
  if (!isVideo && !label) return null;

  const Label = isVideo ? VideoLabel : ArticleLabel;

  return (
    <View style={styles.label}>
      <Label color={color || colours.section.default} title={label} />
    </View>
  );
};

HeaderLabel.propTypes = articleLabelPropTypes;
HeaderLabel.defaultProps = articleLabelDefaultProps;

export default HeaderLabel;

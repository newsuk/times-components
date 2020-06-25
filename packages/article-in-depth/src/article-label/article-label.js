import React from "react";
import { View } from "react-native";
import ArticleLabel from "@times-components-native/article-label";
import VideoLabel from "@times-components-native/video-label";

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
      <Label color={color} title={label} />
    </View>
  );
};

HeaderLabel.propTypes = articleLabelPropTypes;
HeaderLabel.defaultProps = articleLabelDefaultProps;

export default HeaderLabel;

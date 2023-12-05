import React from "react";
import { TcView } from "@times-components/utils";
import ArticleLabel from "@times-components/article-label";
import VideoLabel from "@times-components/video-label";

import {
  articleLabelPropTypes,
  articleLabelDefaultProps
} from "./article-label-prop-types";
import styles from "../styles";

const HeaderLabel = ({ color, isVideo, label }) => {
  if (!isVideo && !label) return null;

  const Label = isVideo ? VideoLabel : ArticleLabel;

  return (
    <TcView style={styles.label}>
      <Label color={color} title={label} />
    </TcView>
  );
};

HeaderLabel.propTypes = articleLabelPropTypes;
HeaderLabel.defaultProps = articleLabelDefaultProps;

export default HeaderLabel;

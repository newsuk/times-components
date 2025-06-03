import React from "react";
import PropTypes from "prop-types";

import { TcView } from "@times-components/utils";
import styles from "./styles";

const AdContainer = ({ slotName, style }) => {
  const adMap = {
    header: "ad-header",
    "inline-ad": "ad-article-inline",
    articleListAd: "ad-article-inline",
    pixel: "ad-pixel",
    pixelteads: "ad-pixelteads",
    pixelskin: "ad-pixelskin",
    inlineAd1: "ad-article-inline-1",
    inlineAd2: "ad-article-inline-2",
    inlineAd3: "ad-article-inline-3",
    inlineAd4: "ad-article-inline-4",
    videoAd1: "ad-vid-article-1",
    videoAd2: "ad-vid-article-2"
  };

  return (
    <TcView style={{ ...styles.container, ...style }}>
      <div id={`${adMap[slotName]}`} />
    </TcView>
  );
};

const propTypes = {
  slotName: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([PropTypes.object]).isRequired
};

AdContainer.propTypes = propTypes;

export default AdContainer;

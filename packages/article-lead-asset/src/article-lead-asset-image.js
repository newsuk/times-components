import React from "react";
import { appendToImageURL, addMissingProtocol } from "@times-components/utils";
import getRatio from "./get-ratio";
import { imageLeadAssetPropTypes } from "./article-lead-asset-prop-types";
import styles from "../styles/index";

const LeadAssetImage = ({ aspectRatio, alt, uri, isWebPFormatActive }) => {
  const url = addMissingProtocol(uri);
  const ratio = getRatio(aspectRatio);

  const sizes = [360, 520, 680, 860, 1200, 1500];
  const srcSet = sizes.map(
    size => `${appendToImageURL(url, "resize", size)} ${size}w`
  );
  const webpSrcSet = srcSet
    .map(srcSetUrl => appendToImageURL(srcSetUrl, "format", "webp"))
    .join(",");

  return (
    <div
      style={{ ...styles.wrapper, paddingBottom: `${100 / ratio}%` }}
      className="lcpItem"
    >
      <picture>
        {isWebPFormatActive && <source srcSet={webpSrcSet} type="image/webp" />}
        <img
          alt={alt}
          style={styles.img}
          src={appendToImageURL(url, "resize", sizes[0])}
          srcSet={srcSet.join(",")}
          fetchpriority="high"
        />
      </picture>
    </div>
  );
};

LeadAssetImage.propTypes = imageLeadAssetPropTypes;
export default LeadAssetImage;

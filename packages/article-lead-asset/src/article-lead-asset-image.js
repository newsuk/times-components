import React from "react";
import { appendToImageURL, addMissingProtocol } from "@times-components/utils";
import getRatio from "./get-ratio";
import { imageLeadAssetPropTypes } from "./article-lead-asset-prop-types";
import styles from "../styles/index.web";

const LeadAssetImage = ({ aspectRatio, alt, uri }) => {
  const url = addMissingProtocol(uri);
  const ratio = getRatio(aspectRatio);

  return (
    <div style={{ ...styles.wrapper, paddingBottom: `${100 / ratio}%` }}>
      <img
        alt={alt}
        style={styles.img}
        src={appendToImageURL(url, "resize", 1200)}
        srcSet={`${appendToImageURL(
          url,
          "resize",
          320
        )} 320w, ${appendToImageURL(
          url,
          "resize",
          1200
        )} 685w, ${appendToImageURL(url, "resize", 1200)} 1200w`}
      />
    </div>
  );
};

LeadAssetImage.propTypes = imageLeadAssetPropTypes;
export default LeadAssetImage;

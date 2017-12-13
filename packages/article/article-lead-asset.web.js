import React from "react";
import PropTypes from "prop-types";
import ArticleImage from "@times-components/article-image";
import {
  LeadAsset,
  MediaContainerDesktop,
  MediaContainerMobile,
  LeadAssetMobile,
  LeadAssetDesktop
} from "./styles/body/responsive";

function renderLeadAsset(leadAsset) {
  if (leadAsset) {
    return (
      <LeadAsset>
        <LeadAssetMobile>
          <ArticleImage
            imageOptions={{
              display: "",
              ratio: leadAsset.crop.ratio,
              url: leadAsset.crop.url
            }}
          />
        </LeadAssetMobile>
        <LeadAssetDesktop>
          <ArticleImage
            imageOptions={{
              display: "",
              ratio: leadAsset.crop.ratio,
              url: leadAsset.crop.url
            }}
            captionOptions={{
              caption: leadAsset.caption,
              credits: leadAsset.credits
            }}
          />
        </LeadAssetDesktop>
      </LeadAsset>
    );
  }
  return null;
}

const LeadAssetComponent = props => {
  const { device, leadAsset } = props;
  if (device === "DESKTOP") {
    return (
      <MediaContainerDesktop>
        {renderLeadAsset(leadAsset)}
      </MediaContainerDesktop>
    );
  }
  return (
    <MediaContainerMobile>{renderLeadAsset(leadAsset)}</MediaContainerMobile>
  );
};

LeadAssetComponent.propTypes = {
  device: PropTypes.oneOf(["MOBILE", "DESKTOP"]),
  leadAsset: PropTypes.shape({
    caption: PropTypes.string,
    credits: PropTypes.string,
    crop: PropTypes.shape({
      ratio: PropTypes.string,
      url: PropTypes.string
    })
  })
};

LeadAssetComponent.defaultProps = {
  device: "MOBILE",
  leadAsset: null
};

export default LeadAssetComponent;

import React from "react";
import PropTypes from "prop-types";
import Image from "@times-components/image";
import Caption from "@times-components/caption";
import {
  LeadAsset,
  MediaContainerDesktop,
  MediaContainerMobile,
  LeadAssetMobile,
  LeadAssetDesktop
} from "./styles/article-body/responsive";

function renderLeadAsset(leadAsset) {
  if (leadAsset) {
    const [ratioWidth, ratioHeight] = leadAsset.crop.ratio.split(":");
    const aspectRatio = ratioWidth / ratioHeight;
    return (
      <LeadAsset>
        <LeadAssetMobile key={`leadassetmob${leadAsset.crop.url}`}>
          <Image uri={leadAsset.crop.url} aspectRatio={aspectRatio} />
        </LeadAssetMobile>
        <LeadAssetDesktop key={`leadassetdesktop${leadAsset.crop.url}`}>
          <Image uri={leadAsset.crop.url} aspectRatio={aspectRatio} />
          <Caption text={leadAsset.caption} credits={leadAsset.credits} />
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

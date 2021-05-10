import React from "react";
import PropTypes from "prop-types";

import { ViewCountWrapper } from "@times-components/ts-components";

import InlineNewsletterPuff from "./inline-newsletter-puff";

const AutoNewsletterPuff = ({
  analyticsStream,
  code,
  copy,
  headline,
  imageUri,
  label
}) => (
  <ViewCountWrapper
    trackingName={`auto-puff-${code}`}
    displayFunction={count => [1, 3, 7].includes(count)}
  >
    <div style={{ display: "none" }}>
      <InlineNewsletterPuff
        analyticsStream={analyticsStream}
        code={code}
        copy={copy}
        headline={headline}
        imageUri={imageUri}
        label={label}
      />
    </div>
  </ViewCountWrapper>
);

export default AutoNewsletterPuff;

AutoNewsletterPuff.propTypes = {
  analyticsStream: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
  copy: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
  imageUri: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

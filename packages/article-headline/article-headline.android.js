// This component exists to add letter spacing on Android.
// https://github.com/facebook/react-native/pull/13199

import React from "react";
import PropTypes from "prop-types";
import WebViewAutoHeight from "./WebView-auto-height";

const ArticleHeadline = ({ text, baseUrl }) => {
  const html = `
    <div>
      <style>
        @font-face {
          font-family: TimesModern;
          src: url(/fonts/TimesModern.woff2) format("woff2"), url(/fonts/TimesModern.woff) format("woff"), url(/fonts/TimesModern.ttf) format("truetype");
        }
        p {
          color: #1D1D1B;
          font-size: 22px;
          line-height: 25px;
          margin-bottom: 8px;
          font-family: TimesModern;
          font-weight: bold;
          letter-spacing: 0.5px;
        }
      </style>
      <p>${text}</p>
    </div>
  `;

  return <WebViewAutoHeight source={{ html, baseUrl }} />;
};

ArticleHeadline.propTypes = {
  text: PropTypes.string.isRequired,
  baseUrl: PropTypes.string
};

ArticleHeadline.defaultProps = {
  baseUrl: "https://www.thetimes.co.uk/"
};

export default ArticleHeadline;

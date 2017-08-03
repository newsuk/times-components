// This component exists to add letter spacing on Android.
// https://github.com/facebook/react-native/pull/13199

import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import WebViewAutoHeight from "./WebView-auto-height";

const ArticleHeadline = ({ title, style, baseUrl }) => {
  const html = `
    <div>
      <style>
        @font-face {
          font-family: TimesModernBold;
          src: url(/fonts/TimesModern-Bold.woff2) format("woff2"), url(/fonts/TimesModern-Bold.woff) format("woff"), url(/fonts/TimesModern-Bold.ttf) format("truetype");
          font-weight: 400;
          font-style: normal;
        }
        p {
          color: #1D1D1B;
          font-size: 22px;
          line-height: 22px;
          margin-bottom: 8px;
          font-family: TimesModernBold;
          font-weight: 400;
          letter-spacing: 1px;
        }
      </style>
      <p>${title}</p>
    </div>
  `;

  return <WebViewAutoHeight source={{ html, baseUrl }} style={style} />;
};

ArticleHeadline.propTypes = {
  title: PropTypes.string.isRequired,
  style: Text.propTypes.style,
  baseUrl: PropTypes.string
};

ArticleHeadline.defaultProps = {
  style: null,
  baseUrl: "https://www.thetimes.co.uk/"
};

export default ArticleHeadline;

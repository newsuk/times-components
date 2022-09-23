/* eslint-env browser */

import React from "react";
import xss from "xss";
import { TcText, TcView, checkStylesForUnits } from "@times-components/utils";
import { defaultProps, propTypes } from "./caption-prop-types";
import styles from "./styles";

const renderCredits = (style, credits) => {
  if (!credits || credits === "") {
    return null;
  }

  const sanitiseCopy = (copy, allowedTags) => {
    const decodeEntities = inputString => {
      const decodedString = document.createElement("textarea");
      decodedString.innerHTML = inputString;
      return decodedString.value;
    };

    const options = {
      whiteList: allowedTags,
      stripIgnoreTag: true,
      stripIgnoreTagBody: ["script"]
    };

    const decodedCopy = decodeEntities(copy);

    return xss(decodedCopy, options);
  };

  return (
    <TcText
      style={checkStylesForUnits({
        ...styles.text,
        ...styles.credits,
        ...style.text,
        ...style.credits
      })}
      dangerouslySetInnerHTML={{ __html: sanitiseCopy(credits.toUpperCase()) }}
    />
  );
};

const renderText = (style, text) => {
  if (!text || text === "") {
    return null;
  }

  return (
    <TcText
      style={checkStylesForUnits({
        ...styles.text,
        ...style.text,
        ...style.caption
      })}
    >
      {text}
    </TcText>
  );
};

const Caption = ({ children, credits, style, text }) => (
  <TcView>
    {children}
    <TcView style={{ ...styles.container, ...style.container }}>
      {renderText(style, text)}
      {renderCredits(style, credits)}
    </TcView>
  </TcView>
);

Caption.propTypes = propTypes;
Caption.defaultProps = defaultProps;

export default Caption;
export { default as CentredCaption } from "./centred-caption";

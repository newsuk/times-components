import React from "react";
import { TcText, TcView, checkStylesForUnits } from "@times-components/utils";
import { sanitiseCopy } from "@times-components/ts-components";
import { defaultProps, propTypes } from "./caption-prop-types";
import styles from "./styles";

const renderCredits = (style, credits) => {
  if (!credits || credits === "") {
    return null;
  }

  return (
    <TcText
      style={checkStylesForUnits({
        ...styles.text,
        ...styles.credits,
        ...style.text,
        ...style.credits
      })}
      dangerouslySetInnerHTML={{
        __html: sanitiseCopy(credits.toUpperCase())
      }}
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

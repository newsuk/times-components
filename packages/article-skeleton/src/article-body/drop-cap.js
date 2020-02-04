import React from "react";
import { fonts, tabletWidth } from "@times-components/styleguide";
import { FontStorage, BoxExclusion } from "@times-components/typeset";
import { screenWidth } from "@times-components/utils";
import { Text } from "react-native";
import { getStringBounds } from "../body-utils";

export default (scale, color, dropCapFont, paragraph) => {
  let letter = paragraph.slice(0, 1);
  if (['"', "“", "‘", "'"].includes(letter.string)) {
    letter = paragraph.slice(0, 2);
  }
  if (!letter.attributes.length) {
    return false;
  }
  const baseStyle = letter.attributes[0].tag.settings;
  const fontSize = baseStyle.fontSize * 6;
  const fontSettings = {
    fontFamily: fonts[dropCapFont],
    fontStyle: "",
    fontWeight: "",
    fontSize,
    color
  };
  const font = FontStorage.getFont(fontSettings);
  const { width, height } = getStringBounds(fontSettings, letter.string);
  const advance = font.getAdvanceWidth(letter.string, baseStyle.fontSize);
  const gutters = (screenWidth() - Math.min(screenWidth(), tabletWidth)) / 2;
  const exclusion = new BoxExclusion(0, 0, width + advance, height);
  const element = (
    <Text
      allowFontScaling={false}
      style={[
        {
          position: "absolute",
          left: gutters + advance,
          fontSize,
          lineHeight: fontSize,
          top: -(baseStyle.fontSize / 2),
          fontFamily: fonts[dropCapFont],
          color: fontSettings.color
        }
      ]}
    >
      {letter.string}
    </Text>
  );
  return {
    exclusion,
    element,
    length: letter.length
  };
};

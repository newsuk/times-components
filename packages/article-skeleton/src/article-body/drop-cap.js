import React from "react";
import { fonts } from "@times-components/styleguide";
import { FontStorage, BoxExclusion } from "@times-components/typeset";
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
  const baseStyle = letter.attributes[0][0].settings;
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
  const exclusion = new BoxExclusion(
    0,
    0,
    width + letter.length * advance,
    height
  );
  const element = (
    <Text
      allowFontScaling={false}
      style={[
        {
          position: "absolute",
          left: advance,
          fontSize,
          lineHeight: height * 1.33,
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

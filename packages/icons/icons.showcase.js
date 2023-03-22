/* eslint-disable react/prop-types */
import React from "react";
import { TcView, TcText } from "@times-components/utils";
import { colours, fontsWithFallback } from "@times-components/ts-styleguide";
import * as Icons from "./src/icons";

const borderWidth = 1;
const borderColor = colours.functional.keyline;

const styles = {
  icon: {
    alignItems: "center",
    borderBottomColor: borderColor,
    borderBottomWidth: borderWidth,
    borderRightColor: borderColor,
    borderRightWidth: borderWidth,
    flexGrow: 1,
    justifyContent: "center",
    padding: 20
  },
  label: {
    fontFamily: fontsWithFallback.supporting,
    paddingTop: 15
  },
  wrapper: {
    borderLeftColor: borderColor,
    borderLeftWidth: borderWidth,
    borderTopColor: borderColor,
    borderTopWidth: borderWidth,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 20
  }
};

const renderIcon = color => args => {
  const name = args[0];
  const Icon = args[1];

  return (
    <TcView key={name} style={styles.icon}>
      <Icon
        fillColour={color(`Icon ${name} fill`, Icon.defaultProps.fillColour)}
        height={50}
        strokeColour={color(
          `Icon ${name} strike`,
          Icon.defaultProps.strokeColour
        )}
        width={50}
      />
      <TcText style={styles.label}>{name}</TcText>
    </TcView>
  );
};

export default {
  children: [
    {
      component: ({ color }) => (
        <TcView>
          <TcView style={styles.wrapper}>
            {Object.entries(Icons).map(renderIcon(color))}
          </TcView>
        </TcView>
      ),
      name: "Icons",
      type: "story"
    }
  ],
  name: "Primitives/Icons"
};

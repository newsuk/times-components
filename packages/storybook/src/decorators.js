import React from "react";
import { TcView } from "@times-components/utils";

export const CenteredDecorator = storyFn => (
  <TcView
    style={{
      alignItems: "center",
      bottom: 0,
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      left: 0,
      position: "absolute",
      right: 0,
      top: 0
    }}
  >
    {storyFn()}
  </TcView>
);

export const BarSpacingDecorator = storyFn => (
  <TcView
    style={{
      flex: 1,
      marginTop: 20
    }}
  >
    {storyFn()}
  </TcView>
);

export const LateralSpacingDecorator = storyFn => (
  <TcView
    style={{
      flex: 1,
      marginLeft: 20,
      marginRight: 20
    }}
  >
    {storyFn()}
  </TcView>
);

export const WhiteBgColorDecorator = storyFn => (
  <TcView
    style={{
      backgroundColor: "white",
      bottom: 0,
      flex: 1,
      left: 0,
      position: "absolute",
      right: 0,
      top: 0
    }}
  >
    {storyFn()}
  </TcView>
);

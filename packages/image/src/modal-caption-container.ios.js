import React from "react";
import { Dimensions } from "react-native";
import Gradient from "@times-components/gradient";
import SafeAreaView from "./react-native-safe-area";

const GRADIENT_HEIGHT = 140;
const MIN_BLACK_HEIGHT = 50;
const END_POINT = `${1 - MIN_BLACK_HEIGHT / GRADIENT_HEIGHT}`;

function ModalCaptionContainer({ children, style, ...props }) {
  return (
    <Gradient
      {...props}
      degrees={180}
      endColour="#000000E6"
      endPoint={END_POINT}
      height={GRADIENT_HEIGHT}
      startColour="#00000000"
      style={[style, { height: GRADIENT_HEIGHT }]}
      width={Dimensions.get("window").width}
    >
      <SafeAreaView
        forceInset={{
          bottom: "always",
          horizontal: "always",
          top: "never"
        }}
      >
        {children}
      </SafeAreaView>
    </Gradient>
  );
}

export default ModalCaptionContainer;

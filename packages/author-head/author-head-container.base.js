import React from "react";
import { StyleSheet, View } from "react-native";  

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    backgroundColor: "transparent"
  },
  container: {
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
    paddingBottom: 40,
    backgroundColor: "#F9F8F3"
  }
});

const AuthorHeadContainer = ({style, children, WrapperComponent}) => (
  <View style={styles.wrapper} pointerEvents="box-none">
    <WrapperComponent accessibilityRole="banner" style={[styles.container, style]}>
      {children}
    </WrapperComponent>    
  </View>
)

AuthorHeadContainer.defaultProps = {
  WrapperComponent: View
}

export default AuthorHeadContainer;

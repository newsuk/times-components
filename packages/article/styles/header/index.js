import { StyleSheet } from "react-native";
import globalStyle from "../article-global-style";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...globalStyle,
  ...sharedStyles
});

export default styles;

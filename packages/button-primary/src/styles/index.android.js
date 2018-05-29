import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  listErrorButton: {
  	...sharedStyles.listErrorButton,
  	borderRadius: 4,
  	height: 36,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 10,
    position:'relative'
  }
});

export default styles;

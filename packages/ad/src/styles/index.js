import { StyleSheet } from "react-native";
import styleguide from "@times-components/styleguide";

export const calculateViewBox = ({ height, width }) => {
  if (height >= 90 && width >= 728) {
    return {
      marginLeft: 630,
      marginTop: -120,
      svgHeight: 50,
      svgWidth: 1200
    };
  }

  if (height >= 250 && width >= 300) {
    return {
      marginLeft: 15,
      marginTop: 0,
      svgHeight: 250,
      svgWidth: 269
    };
  }

  return {
    marginLeft: 50,
    marginTop: 0,
    svgHeight: height,
    svgWidth: width
  };
};

const { colours, fontFactory, spacing } = styleguide();
const styles = StyleSheet.create({
  children: {
    flex: 1
  },
  container: {
    alignItems: "center",
    flex: 1
  },
  placeholderContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  placeholderText: {
    backgroundColor: colours.functional.backgroundPrimary,
    borderColor: colours.functional.keyline,
    borderStyle: "solid",
    borderWidth: 1,
    color: colours.functional.secondary,
    ...fontFactory({
      font: "body",
      fontSize: "puffLink"
    }),
    letterSpacing: 1.5,
    paddingBottom: spacing(1),
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
    paddingTop: spacing(1),
    zIndex: 1
  },
  placeholderWrapper: {
    alignItems: "center",
    backgroundColor: colours.functional.backgroundPrimary,
    borderColor: colours.functional.keyline,
    borderStyle: "solid",
    borderWidth: 1,
    justifyContent: "center",
    overflow: "hidden"
  },
  watermarkContainer: {
    left: 0,
    position: "absolute",
    top: 0
  }
});

export default styles;

import { colours, spacing } from "@times-components/styleguide";

const styles = {
  buttonContainer: {
    left: spacing(3),
    position: "absolute",
    top: spacing(3),
    zIndex: 1
  },
  closeButton: {
    height: 24,
    width: 24
  },
  container: {
    flex: 1
  },
  image: {
    opacity: 1,
    width: "100%"
  },
  imageBackground: {
    height: "100%",
    position: "absolute",
    width: "100%",
    zIndex: 1
  },
  imageContainer: {
    flexGrow: 1,
    justifyContent: "center"
  },
  modal: {
    backgroundColor: colours.functional.brandColour,
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-between",
    width: "100%"
  },
  placeholderContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  safeViewContainer: {
    flex: 1
  },
  safeViewInnerContainer: {
    flex: 1,
    position: "relative"
  }
};

export const captionStyles = {
  container: {
    bottom: 14,
    left: 16,
    position: "absolute",
    right: 16
  },
  text: {
    color: colours.functional.white
  }
};

export default styles;

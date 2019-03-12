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
    /*
     * Due to our use of SafeAreaView, on layout is called multiple times meaning
     * the placeholder may appear outside of the bounds of the image momentarily
     * causing a white flash. This prevents that from occurring
     */
    overflow: "hidden"
  },
  imageBackground: {
    height: "100%",
    position: "absolute",
    width: "100%",
    zIndex: 1
  },
  imageContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center"
  },
  imageFullHeight: { height: "100%" },
  imageFullWidth: { width: "100%" },
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

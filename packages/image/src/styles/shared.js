import { colours, spacing } from "@times-components/styleguide";

const styles = {
  buttonContainer: {
    left: spacing(3),
    position: "absolute",
    top: spacing(3),
    zIndex: 1
  },
  buttonContainerTablet: {
    left: spacing(4),
    top: spacing(4)
  },
  closeButton: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 30,
    height: 30,
    justifyContent: "center",
    width: 30
  },
  closeButtonImage: {
    height: "85%",
    width: "85%"
  },
  closeButtonTablet: {
    borderRadius: 40,
    height: 40,
    width: 40
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
  caption: {
    fontSize: 15,
    lineHeight: 19
  },
  container: {
    bottom: 0,
    left: 0,
    paddingHorizontal: spacing(3),
    paddingVertical: spacing(3),
    position: "absolute",
    right: 0
  },
  credits: {
    fontSize: 10,
    lineHeight: 20,
    marginTop: 5
  },
  text: {
    color: colours.functional.white
  }
};

export const tabletCaptionStyles = {
  ...captionStyles,
  container: {
    ...captionStyles.container,
    paddingHorizontal: spacing(4),
    paddingVertical: spacing(4)
  }
};

export default styles;

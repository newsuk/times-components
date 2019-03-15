import { colours, spacing } from "@times-components/styleguide";

const styles = {
  buttonContainer: {
    backgroundColor: '#0000FF80',
    marginHorizontal: spacing(3),
    marginVertical: spacing(3),
  },
  buttonContainerTablet: {
    marginHorizontal: spacing(4),
    marginVertical: spacing(4),
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
    overflow: "hidden",
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1
  },
  imageBackground: {
    resizeMode: "contain"
  },
  imageContainer: {
    alignItems: "center",
    backgroundColor: '#00FF0080',
    flexGrow: 1,
    justifyContent: "center",
    margin: 10,
    // overflow: "hidden",
    position: "relative"
  },
  // imageFullHeight: { flex: 1 },
  // imageFullWidth: { width: "100%" },
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
    flexGrow: 0,
    height: "100%",
    backgroundColor: "red"
  }
};

export const captionStyles = {
  caption: {
    fontSize: 15,
    lineHeight: 19
  },
  container: {
    backgroundColor: '#FF000080',
    marginHorizontal: spacing(3),
    marginVertical: spacing(3),
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
    marginHorizontal: spacing(4),
    marginVertical: spacing(4)
  }
};

export default styles;

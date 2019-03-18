import { colours, spacing } from "@times-components/styleguide";

const styles = {
  buttonContainer: {
    marginHorizontal: spacing(3),
    marginVertical: spacing(3)
  },
  buttonContainerTablet: {
    marginHorizontal: spacing(4),
    marginVertical: spacing(4)
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
    bottom: 0,
    height: "100%",
    left: 0,
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    right: 0,
    top: 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  imageBackground: {
    bottom: 0,
    height: "100%",
    left: 0,
    position: "absolute",
    resizeMode: "contain",
    right: 0,
    top: 0,
    width: "100%",
    zIndex: 1
  },
  imageContainer: {
    flexGrow: 1,
    position: "relative",
    zIndex: 1
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
    flexGrow: 0,
    height: "100%"
  }
};

export const captionStyles = {
  caption: {
    fontSize: 15,
    lineHeight: 19
  },
  container: {
    marginHorizontal: spacing(3),
    marginVertical: spacing(3)
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

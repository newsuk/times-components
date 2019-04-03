import { colours, spacing } from "@times-components/styleguide";

const styles = {
  bottomSafeView: {
    flex: 0,
    marginTop: "auto",
    position: "relative",
    width: "100%",
    zIndex: 2
  },
  buttonContainer: {
    padding: spacing(3),
    position: "relative",
    zIndex: 2
  },
  buttonContainerTablet: {
    padding: spacing(4)
  },
  closeButton: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 25,
    height: 25,
    justifyContent: "center",
    width: 25
  },
  closeButtonImage: {
    height: "85%",
    width: "85%"
  },
  closeButtonTablet: {
    borderRadius: 30,
    height: 30,
    width: 30
  },
  gestureContainer: {
    height: "100%",
    width: "100%"
  },
  image: {
    height: "100%",
    position: "absolute",
    resizeMode: "contain",
    width: "100%"
  },
  imageContainer: {
    position: "relative"
  },
  middleSafeView: {
    bottom: 0,
    height: "100%",
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    width: "100%",
    zIndex: 1
  },
  modal: {
    backgroundColor: "#000000",
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-between",
    width: "100%"
  },
  modalBackground: {
    backgroundColor: "#000000",
    flex: 1
  },
  modalImageContainer: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
    position: "absolute",
    width: "100%"
  },
  placeholder: {
    alignItems: "center",
    backgroundColor: colours.functional.backgroundSecondary,
    flex: 1,
    justifyContent: "center"
  },
  topSafeView: {
    backgroundColor: "#000000",
    flex: 0
  }
};

export const captionStyles = {
  caption: {
    fontSize: 15,
    lineHeight: 15
  },
  container: {
    margin: spacing(3)
  },
  credits: {
    fontSize: 10,
    lineHeight: 10,
    marginTop: spacing(1)
  },
  text: {
    color: colours.functional.white
  }
};

export const tabletCaptionStyles = {
  ...captionStyles,
  container: {
    ...captionStyles.container,
    margin: spacing(4)
  }
};

export default styles;

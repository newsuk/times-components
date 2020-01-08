import { colours, spacing } from "@times-components/styleguide";

const CLOSE_BUTTON_PHONE_SIZE = 25;
const CLOSE_BUTTON_TABLET_SIZE = 30;

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
    position: "absolute",
    top: 0,
    zIndex: 2
  },
  buttonContainerTablet: {
    padding: spacing(4)
  },
  closeButton: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: CLOSE_BUTTON_PHONE_SIZE,
    height: CLOSE_BUTTON_PHONE_SIZE,
    justifyContent: "center",
    width: CLOSE_BUTTON_PHONE_SIZE
  },
  closeButtonImage: {
    height: "85%",
    width: "85%"
  },
  closeButtonTablet: {
    borderRadius: CLOSE_BUTTON_TABLET_SIZE,
    height: CLOSE_BUTTON_TABLET_SIZE,
    width: CLOSE_BUTTON_TABLET_SIZE
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
    backgroundColor: colours.functional.modalBackground,
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-between",
    width: "100%"
  },
  modalBackground: {
    backgroundColor: colours.functional.modalBackground,
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
    justifyContent: "center"
  },
  topSafeView: {
    backgroundColor: colours.functional.modalBackground,
    flex: 0
  },
  roundContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    overflow: "hidden"
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

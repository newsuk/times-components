import { colours, spacing } from "@times-components/styleguide";

const styles = {
  buttonContainer: {
    marginLeft: spacing(3),
    marginTop: spacing(3),
    position: "relative",
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
  }
};

export const captionStyles = {
  container: {
    marginBottom: 14,
    marginHorizontal: 16
  },
  text: {
    color: colours.functional.white
  }
};

export default styles;

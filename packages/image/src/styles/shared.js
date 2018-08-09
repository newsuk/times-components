import { colours } from "@times-components/styleguide";

const styles = {
  buttonContainer: {
    marginLeft: 15,
    marginTop: 20
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
    width: "100%"
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

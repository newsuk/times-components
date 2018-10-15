import { fonts } from "./src/styleguide";
import fontSizes from "./src/fonts/font-sizes";

const styles = {
  animationBox: {
    backgroundColor: "#CCCCCC",
    margin: 50,
    padding: 100
  },
  box: {
    height: 100,
    marginBottom: 10
  },
  container: {
    borderColor: "#DBDBDB",
    borderWidth: 1,
    margin: 20,
    paddingBottom: 10,
    width: 250
  },
  display: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  headline: {
    fontSize: fontSizes.body,
    fontWeight: "bold",
    marginBottom: 10
  },
  showoffFonts: {
    fontSize: fontSizes.headline,
    marginBottom: 20,
    marginLeft: 20,
    marginTop: 10
  },
  showoffFontsContainer: {
    borderBottomColor: "#CCCCCC",
    borderBottomWidth: 1,
    margin: 20
  },
  subHeadline: {
    fontSize: fontSizes.meta,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 10
  },
  text: {
    color: "#333333",
    fontFamily: fonts.body,
    fontSize: fontSizes.caption,
    textAlign: "center"
  }
};

export default styles;

import { fonts } from "./styleguide";

const styles = {
  display: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  container: {
    width: 250,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: "#DBDBDB",
    margin: 20
  },
  box: {
    height: 100,
    marginBottom: 10
  },
  text: {
    textAlign: "center",
    fontFamily: fonts.body,
    fontSize: 12,
    color: "#333333"
  },
  animationBox: {
    backgroundColor: "#CCCCCC",
    margin: 50,
    padding: 100
  },
  showoffFontsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    margin: 20
  },
  headline: {
    fontSize: "14",
    fontWeight: "bold",
    marginBottom: 10
  },
  showoffFonts: {
    fontSize: 30,
    paddingTop: 15,
    paddingBottom: 20
  }
};

export default styles;

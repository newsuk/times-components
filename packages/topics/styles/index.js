import { colours, fonts } from "@times-components/styleguide";

const styles = {
  container: {
    borderColor: colours.functional.keyline,
    borderRadius: 1,
    borderWidth: 1,
    paddingBottom: 12,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 12,
    marginRight: 10,
    marginTop: 10
  },
  text: {
    color: colours.functional.secondary,
    fontFamily: fonts.supporting,
    fontSize: 13
  },
  topicGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  }
};

export default styles;

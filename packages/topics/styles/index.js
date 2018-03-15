import { colours, fonts } from "@times-components/styleguide";

const styles = {
  container: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderColor: colours.functional.keyline,
    borderRadius: 1,
    marginTop: 10,
    marginRight: 5,
    marginLeft: 5
  },
  text: {
    color: colours.functional.secondary,
    fontFamily: fonts.supporting,
    fontSize: 13
  },
  topicGroup: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap"
  }
};

export default styles;

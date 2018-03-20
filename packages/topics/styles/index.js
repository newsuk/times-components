import { colours, fonts, spacing } from "@times-components/styleguide";

const styles = {
  container: {
    borderColor: colours.functional.keyline,
    borderRadius: 1,
    borderWidth: 1,
    paddingBottom: 12,
    paddingLeft: 3 * spacing,
    paddingRight: 3 * spacing,
    paddingTop: 12,
    marginRight: 2 * spacing,
    marginTop: 2 * spacing
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

import { colours, fonts, spacing } from "@times-components/styleguide";

const styles = {
  container: {
    borderColor: colours.functional.keyline,
    borderRadius: 1,
    borderWidth: 1,
    paddingBottom: 12,
    paddingLeft: spacing(3),
    paddingRight: spacing(3),
    paddingTop: 12,
    marginRight: spacing(2),
    marginTop: spacing(2)
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

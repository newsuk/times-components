import styleguide from "@times-components/styleguide";

const { colours, fontFactory, spacing } = styleguide();
const styles = {
  container: {
    borderColor: colours.functional.keyline,
    borderRadius: 2,
    borderWidth: 1,
    paddingBottom: spacing(2),
    paddingLeft: spacing(3),
    paddingRight: spacing(3),
    paddingTop: spacing(2)
  },
  spacer: {
    marginRight: spacing(2),
    marginTop: spacing(2),
    maxWidth: "80%"
  },
  text: {
    color: colours.functional.secondary,
    ...fontFactory({
      font: "supporting",
      fontSize: "link"
    }),
    position: "relative"
  },
  topicGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: spacing(2)
  }
};

export default styles;

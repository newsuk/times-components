import { spacing, colours, fonts } from "@times-components/styleguide";

const styles = {
  body: {
    alignSelf: "flex-end",
    width: "85%"
  },
  header: {
    paddingLeft: spacing(3),
    paddingRight: spacing(3),
    paddingTop: spacing(3),
    width: "85%"
  },
  headLine: {
    fontFamily: fonts.headline,
    fontSize: 25
  },
  main: {
    backgroundColor: colours.functional.border,
    flex: 1,
    marginLeft: spacing(2),
    marginRight: spacing(2),
    marginTop: spacing(2)
  }
};

export default styles;

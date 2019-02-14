import { spacing, colours } from "@times-components/styleguide";

const styles = {
  bodyContainer: {
    alignSelf: "flex-end",
    width: "85%"
  },
  headerContainer: {
    paddingLeft: spacing(3),
    paddingRight: spacing(3),
    paddingTop: spacing(3),
    width: "85%"
  },
  mainContainer: {
    backgroundColor: colours.functional.border,
    flex: 1
  }
};

export default styles;

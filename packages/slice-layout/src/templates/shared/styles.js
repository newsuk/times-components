import { colours, spacing } from "@times-components/styleguide";

const styles = {
  itemColSeparator: {
    borderColor: colours.functional.keyline,
    borderRightWidth: 1,
    borderStyle: "solid",
    marginVertical: spacing(2)
  },
  itemRowSeparator: {
    borderBottomWidth: 1,
    borderColor: colours.functional.keyline,
    borderStyle: "solid",
    marginHorizontal: spacing(2)
  }
};

export default styles;

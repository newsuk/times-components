import { styleguide } from "@times-components/ts-components";

const { colours } = styleguide();
const styles = {
  item: {
    width: "100%"
  },
  itemContainer: {
    borderBottomColor: colours.functional.keyline,
    borderBottomWidth: 1,
    borderStyle: "solid",
    width: "100%"
  },
  itemContainerWithoutBorders: {
    width: "100%"
  }
};

export default styles;

import { spacing } from "@times-components/styleguide";

const styles = {
  container: {
    flex: 1
  },
  itemColumnSeparator: {
    borderLeftWidth: 1,
    marginVertical: spacing(2)
  },
  itemContainer: {
    flexDirection: "row"
  },
  itemHalfWidth: {
    width: "50%"
  },
  itemRowSeparator: {
    borderBottomWidth: 0.5,
    borderStyle: "solid",
    marginHorizontal: spacing(2)
  }
};

export default styles;

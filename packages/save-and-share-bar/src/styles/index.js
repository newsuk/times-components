import { spacing, colours, fontFactory } from "@times-components/styleguide";

const styles = {
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  label: {
    ...fontFactory({
      font: "supporting",
      fontSize: "cardMeta"
    }),
    color: colours.functional.secondary
  },
  link: {
    base: `margin-left: ${spacing(5)};`
  },
  rowItem: {
    flexDirection: "row",
    padding: spacing(4)
  },
  svgIcon: {
    fb: {
      heigth: 20,
      width: 11
    },
    fillColour: colours.functional.secondary,
    width: 22
  }
};

export default styles;

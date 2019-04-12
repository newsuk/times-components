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
    alignItems: "center",
    flexDirection: "row",
    padding: spacing(4)
  },
  svgIcon: {
    fb: {
      height: 23
    },
    fillColour: colours.functional.secondary,
    height: 20
  }
};

export default styles;

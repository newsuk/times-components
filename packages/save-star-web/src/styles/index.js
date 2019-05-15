import { spacing, colours, fontFactory } from "@times-components/styleguide";

const styles = {
  activityLoader: {
    backgroundColor: colours.functional.whiteGrey,
    borderRadius: 9999,
    height: 40,
    marginLeft: spacing(1),
    overflow: "hidden",
    width: 40
  },
  label: {
    ...fontFactory({
      font: "supporting",
      fontSize: "meta"
    }),
    color: colours.functional.secondary,
    marginRight: spacing(2)
  },
  link: {
    base: `
      margin-left: ${spacing(1)};
      border-radius: 9999px;
      overflow: hidden;
      text-align: center;
      line-height: 45px;
      height: 40px;
      width: 40px;
       &:hover {
        background-color: ${colours.functional.whiteGrey};
      }
      &:active {
        background-color: ${colours.functional.keyline};
      }
  `
  },
  save: {
    fillColour: colours.functional.action,
    strokeColour: colours.functional.secondary
  },
  svgIcon: {
    fillColour: colours.functional.secondary,
    hoverFillColour: colours.functional.brandColour
  },
  unsave: {
    fillColour: colours.functional.white,
    strokeColour: colours.functional.secondary
  }
};

const getStyles = ({ saveStatus }) =>
  saveStatus ? styles.save : styles.unsave;
export { getStyles };
export default styles;

import { spacing, colours, fontFactory } from "@times-components/ts-styleguide";

const ICON_SIZE = 40;

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
    marginRight: spacing(2),
    transform: [{ translateY: "9%" }],
    textAlign: "right"
  },
  link: {
    base: `
      margin-left: ${spacing(1)};
      cursor: pointer;
      
      &, > * {
        display: flex;
        align-items: center;
        justify-content: center;
        height: ${ICON_SIZE}px;
        width: ${ICON_SIZE}px;
        border-radius: ${ICON_SIZE}px;
      }
      
      > * {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
      }

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

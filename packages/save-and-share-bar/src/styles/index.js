import { spacing, colours, fontFactory } from "@times-components/ts-styleguide";

const ICON_SIZE = 40;

const styles = {
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: spacing(2),
    paddingBottom: spacing(2),
    height: "100%",
    alignItems: "center"
  },
  activityLoader: {
    borderRadius: 9999,
    height: 40,
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
    transform: "translateY(9%)"
  },
  link: {
    base: `
      margin-left: ${spacing(1)};
      cursor: pointer;
      border-radius: ${ICON_SIZE}px;

      &, > * {
        display: flex;
        align-items: center;
        justify-content: center;
        height: ${ICON_SIZE}px;
        width: ${ICON_SIZE}px;
      }

      &:hover {
        background-color: ${colours.functional.whiteGrey};
      }
      &:active {
        background-color: ${colours.functional.keyline};
      }
    `
  },
  rowItem: {
    alignItems: "center",
    flexDirection: "row",
    height: ICON_SIZE
  },
  rowItemRight: {
    alignItems: "center",
    flexDirection: "row",
    height: ICON_SIZE,
    marginLeft: "auto"
  },
  svgIcon: {
    fb: {
      height: 18
    },
    star: {
      height: 18
    },
    fillColour: colours.functional.secondary,
    height: 16,
    hoverFillColour: colours.functional.brandColour,
    save: {
      fillColour: colours.functional.white,
      strokeColour: colours.functional.secondary
    }
  }
};

export default styles;

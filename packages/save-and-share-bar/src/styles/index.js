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
    `
  },
  rowItem: {
    alignItems: "center",
    flexDirection: "row",
    padding: spacing(4)
  },
  svgIcon: {
    fb: {
      height: 18
    },
    fillColour: colours.functional.secondary,
    height: 15,
    hoverFillColour: colours.functional.brandColour,
    save: {
      fillColour: colours.functional.white,
      strokeColour: colours.functional.secondary
    }
  }
};

const clickedStyles = {
  clickedLink: {
    base: `
      ${styles.link.base} 
      &:hover {
        background-color: ${colours.functional.keyline};
      }
    `
  }
};

export default { ...styles, ...clickedStyles };

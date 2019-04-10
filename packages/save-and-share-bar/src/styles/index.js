import { spacing, colours } from "@times-components/styleguide";

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowItem: {
    flexDirection: 'row',
    padding: spacing(4)
  },
  link: {
    base: `margin-left: 25px;`
  },
  svgIcon: {
    fillColour: colours.functional.secondary,
    height: spacing(4)
  }
};

export default styles;

import { spacing, colours } from "@times-components/styleguide";

const styles = {
  link: {
    base: `margin-left: ${spacing(5)};`
  },
  save: {
    fillColour: colours.functional.action,
    strokeColour: colours.functional.secondary
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

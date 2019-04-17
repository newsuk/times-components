import { spacing, colours } from "@times-components/styleguide";

const styles = {
  link: {
    base: `margin-left: ${spacing(5)};`
  },
  unsave: {
      fillColour: colours.functional.white,
      strokeColour: colours.functional.secondary
  },
  save: {
    fillColour: colours.functional.action,
    strokeColour: colours.functional.secondary
}
};

const getStyles = ({saveStatus}) => (saveStatus ? styles.save: styles.unsave);
export {getStyles};
export default styles;

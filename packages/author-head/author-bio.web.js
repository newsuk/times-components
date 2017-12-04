import Bio from "./author-bio.base";
import withResponsiveStyles from "./responsive-styles";

export default withResponsiveStyles(Bio, {
  medium() {
    return "max-width: 680px";
  },
  huge() {
    return "max-width: 760px";
  }
});

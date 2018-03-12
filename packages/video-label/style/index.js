import { fonts } from "@times-components/styleguide";

const shared = {
  fontFamily: fonts.supporting,
  fontSize: 12,
  lineHeight: 12,
  fontWeight: "400",
  letterSpacing: 1.2,
  padding: 0,
  margin: 0,
  position: "relative"
};

const styles = {
  title: {
    ...shared,
    top: 2
  },
  pipe: {
    ...shared,
    top: 1
  }
};

export default styles;

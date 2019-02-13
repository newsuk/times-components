import { colours, fonts, spacing } from "@times-components/styleguide";

const styles = {
  container: {
    paddingHorizontal: spacing(8),
    paddingTop: spacing(4)
  },
  leadText: {
    color: colours.functional.leadersHeadline,
    fontFamily: fonts.bodyRegular,
    fontSize: 16,
    lineHeight: 15
  },
  leadTextContainer: {
    paddingBottom: spacing(1),
    paddingTop: spacing(2)
  },
  mastheadStyle: {
    height: 51,
    margin: "auto",
    width: 283
  },
  text: {
    textAlign: "center"
  }
};

export default styles;

import { fonts, spacing } from "@times-components/styleguide";

const styles = {
  container: {
    justifyContent: "center",
    paddingBottom: spacing(1),
    paddingTop: spacing(4)
  },
  keySeperator: {
    borderBottomWidth: 1,
    borderColor: "#dcdcdc",
    borderStyle: "solid",
    marginHorizontal: 10
  },
  leadText: {
    color: "#850029",
    fontFamily: fonts.bodyRegular,
    fontSize: 16,
    lineHeight: spacing(3)
  },
  leadTextContainer: {
    paddingBottom: spacing(1),
    paddingTop: spacing(2)
  }
};

export default styles;

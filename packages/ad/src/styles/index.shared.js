import { colours, fontFactory, spacing } from "@times-components/ts-styleguide";

const styles = {
  children: {
    flex: 1
  },
  container: {
    alignItems: "center",
    flex: 1
  },
  placeholderContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    minHeight: "auto" // Prevent flex shrinking it
  },
  placeholderText: {
    backgroundColor: colours.functional.backgroundPrimary,
    borderColor: colours.functional.keyline,
    borderStyle: "solid",
    borderWidth: 1,
    color: colours.functional.secondary,
    ...fontFactory({
      font: "body",
      fontSize: "puffLink"
    }),
    letterSpacing: 1.5,
    paddingBottom: spacing(1),
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
    paddingTop: spacing(1),
    zIndex: 1
  },
  placeholderWrapper: {
    alignItems: "center",
    backgroundColor: colours.functional.backgroundPrimary,
    borderColor: colours.functional.keyline,
    borderStyle: "solid",
    borderWidth: 1,
    justifyContent: "center",
    overflow: "hidden"
  }
};

export default styles;

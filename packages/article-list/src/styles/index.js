import styleguide from "@times-components/styleguide";
import sharedStyles from "./shared";

const { colours, fontFactory, spacing } = styleguide();

const styles = {
  ...sharedStyles,
  listContentErrorContainer: {
    flex: 1,
    margin: spacing(3)
  },
  listEmptyBackButton: {
    alignSelf: "center",
    marginBottom: spacing(2),
    marginTop: spacing(4)
  },
  listEmptyMessage: {
    color: colours.functional.secondary,
    ...fontFactory({
      font: "bodyRegular",
      fontSize: "infoTitle"
    }),
    left: "25%",
    position: "absolute",
    textAlign: "center",
    top: "140px"
  },
  listEmptyStateContainer: {
    height: "100vh",
    justifyContent: "flex-end"
  },
  listErrorHeading: {
    ...sharedStyles.listErrorHeading,
    marginTop: spacing(4)
  },
  listErrorMessage: {
    ...sharedStyles.listErrorMessage,
    lineHeight: 27
  },
  paginationSpacing: {
    ...sharedStyles.paginationSpacing,
    flex: 1
  }
};

const retryButtonStyles = {
  alignSelf: "center",
  marginBottom: spacing(2),
  marginTop: spacing(8)
};

export { retryButtonStyles };
export default styles;

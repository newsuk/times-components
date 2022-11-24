import { colours, fontFactory, spacing } from "@times-components/ts-styleguide";

const styles = {
  listEmptyMessage: {
    color: colours.functional.secondary,
    ...fontFactory({
      font: "bodyRegular",
      fontSize: "infoTitle"
    }),
    marginLeft: spacing(8),
    marginRight: spacing(8),
    marginTop: spacing(12),
    textAlign: "center"
  },
  listEmptyStateContainer: {
    flex: 1
  },
  listEmptyWatermarkContainer: {
    bottom: 0,
    position: "absolute",
    right: 0
  },
  listErrorContainer: {
    height: "100%",
    justifyContent: "space-between",
    marginLeft: spacing(2),
    marginRight: spacing(2),
    paddingTop: spacing(2),
    paddingBottom: spacing(2)
  },
  listErrorHeading: {
    alignSelf: "center",
    color: colours.functional.brandColour,
    ...fontFactory({
      font: "headline",
      fontSize: "leadHeadline"
    }),
    marginBottom: spacing(2),
    textAlign: "center"
  },
  listErrorImageContainer: {
    alignSelf: "center",
    marginTop: spacing(4),
    marginBottom: spacing(4)
  },
  listErrorMessage: {
    color: colours.functional.secondary,
    ...fontFactory({
      font: "bodyRegular",
      fontSize: "infoSubText"
    }),
    textAlign: "center"
  },
  listItemContainer: {
    padding: spacing(2)
  },
  listItemSeparator: {
    backgroundColor: colours.functional.keyline,
    height: 1
  },
  listItemSeparatorContainer: {
    paddingLeft: spacing(2),
    paddingRight: spacing(2)
  },
  loadingContainer: {
    paddingTop: spacing(5),
    paddingBottom: spacing(5)
  },
  paginationContainer: {
    alignItems: "stretch",
    flexDirection: "row",
    justifyContent: "center"
  },
  paginationSpacing: {
    maxWidth: 760
  },
  showMoreRetryContainer: {
    alignSelf: "center",
    padding: spacing(5),
    width: "100%"
  }
};

export default styles;

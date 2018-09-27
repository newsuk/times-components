import styleguide from "@times-components/styleguide";

const { colours, fontFactory, spacing } = styleguide();
const styles = {
  loadingContainer: {
    paddingVertical: spacing(5)
  },
  paginationContainer: {
    alignItems: "stretch",
    flexDirection: "row",
    justifyContent: "center"
  },
  paginationSpacing: {
    maxWidth: 760
  },
  listItemContainer: {
    paddingHorizontal: spacing(2),
    paddingVertical: spacing(2)
  },
  listItemSeparatorContainer: {
    paddingHorizontal: spacing(2)
  },
  listItemSeparator: {
    backgroundColor: colours.functional.keyline,
    height: 1
  },
  showMoreRetryContainer: {
    alignSelf: "center",
    padding: spacing(5),
    width: "100%"
  },
  listErrorContainer: {
    height: "100%",
    justifyContent: "space-between",
    marginHorizontal: spacing(2),
    paddingVertical: spacing(2)
  },
  listErrorImageContainer: {
    alignSelf: "center",
    marginVertical: spacing(4)
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
  listErrorMessage: {
    color: colours.functional.secondary,
    ...fontFactory({
      font: "bodyRegular",
      fontSize: "infoSubText"
    }),
    textAlign: "center"
  },
  listEmptyStateContainer: {
    flex: 1
  },
  listEmptyMessage: {
    color: colours.functional.secondary,
    ...fontFactory({
      font: "bodyRegular",
      fontSize: "infoTitle"
    }),
    marginHorizontal: spacing(8),
    marginTop: spacing(12),
    textAlign: "center"
  },
  listEmptyWatermarkContainer: {
    bottom: 0,
    position: "absolute",
    right: 0
  }
};

export default styles;

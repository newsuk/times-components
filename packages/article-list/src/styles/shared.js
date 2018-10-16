import styleguide from "@times-components/styleguide";

const { colours, fontFactory, spacing } = styleguide();
const styles = {
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
    marginHorizontal: spacing(2),
    paddingVertical: spacing(2)
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
    marginVertical: spacing(4)
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
    paddingHorizontal: spacing(2),
    paddingVertical: spacing(2)
  },
  listItemSeparator: {
    backgroundColor: colours.functional.keyline,
    height: 1
  },
  listItemSeparatorContainer: {
    paddingHorizontal: spacing(2)
  },
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
  showMoreRetryContainer: {
    alignSelf: "center",
    padding: spacing(5),
    width: "100%"
  }
};

export default styles;

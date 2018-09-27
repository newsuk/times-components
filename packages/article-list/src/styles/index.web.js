import { StyleSheet } from "react-native";
import styleguide from "@times-components/styleguide";
import sharedStyles from "./shared";

const { colours, fontFactory, spacing } = styleguide();

const styles = StyleSheet.create({
  ...sharedStyles,
  paginationSpacing: {
    ...sharedStyles.paginationSpacing,
    flex: 1
  },
  adContainer: {
    borderBottomWidth: 1,
    borderColor: colours.functional.keyline,
    borderTopWidth: 1,
    paddingVertical: spacing(2),
    top: 1
  },
  listContentErrorContainer: {
    flex: 1,
    margin: spacing(3)
  },
  listErrorHeading: {
    ...sharedStyles.listErrorHeading,
    marginTop: spacing(4)
  },
  listErrorMessage: {
    ...sharedStyles.listErrorMessage,
    lineHeight: 27
  },
  listEmptyStateContainer: {
    height: "100vh",
    justifyContent: "flex-end"
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
  listEmptyWatermarkContainer: {
    alignSelf: "flex-end"
  },
  listEmptyBackButton: {
    alignSelf: "center",
    marginBottom: spacing(2),
    marginTop: spacing(4)
  }
});

const retryButtonStyles = {
  alignSelf: "center",
  marginBottom: spacing(2),
  marginTop: spacing(8)
};

const watermarkStyles = {
  width: 500,
  height: 350,
  viewBox: "0 0 350 200"
};

export { retryButtonStyles, watermarkStyles };
export default styles;

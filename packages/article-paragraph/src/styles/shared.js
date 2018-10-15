import styleguide from "@times-components/styleguide";
import margins from "./margins";

const sharedStyles = scale => {
  const { colours, fontFactory, spacing } = styleguide({ scale });
  const dropCapMargins = margins(scale);

  return {
    articleTextElement: {
      ...fontFactory({
        font: "body",
        fontSize: "bodyMobile"
      }),
      marginBottom: spacing(5),
      color: colours.functional.primary
    },
    articleMainContentRow: {
      paddingLeft: spacing(2),
      paddingRight: spacing(2)
    },
    dropCapContainer: {
      flexDirection: "row",
      flexWrap: "wrap"
    },
    dropCapTextElement: {
      ...fontFactory({
        font: "dropCap",
        fontSize: "dropCap"
      }),
      marginRight: spacing(1),
      marginTop: dropCapMargins.top,
      marginBottom: dropCapMargins.bottom,
      color: colours.functional.primary
    }
  };
};

export default sharedStyles;

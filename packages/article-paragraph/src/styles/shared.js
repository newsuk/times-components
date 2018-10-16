import styleguide from "@times-components/styleguide";
import margins from "./margins";

const sharedStyles = scale => {
  const { colours, fontFactory, spacing } = styleguide({ scale });
  const dropCapMargins = margins(scale);

  return {
    articleMainContentRow: {
      paddingLeft: spacing(2),
      paddingRight: spacing(2)
    },
    articleTextElement: {
      ...fontFactory({
        font: "body",
        fontSize: "bodyMobile"
      }),
      color: colours.functional.primary,
      marginBottom: spacing(5)
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
      color: colours.functional.primary,
      marginBottom: dropCapMargins.bottom,
      marginRight: spacing(1),
      marginTop: dropCapMargins.top
    }
  };
};

export default sharedStyles;

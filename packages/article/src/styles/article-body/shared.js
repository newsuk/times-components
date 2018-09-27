import styleguide from "@times-components/styleguide";

const sharedStyles = scale => {
  const { colours, fontFactory, spacing } = styleguide({ scale });
  return {
    leadAsset: {
      marginBottom: spacing(2)
    },
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
    articleLink: {
      color: colours.functional.action,
      ...fontFactory({
        font: "body",
        fontSize: "bodyMobile"
      }),
      marginBottom: spacing(5),
      marginTop: 0
    },
    ad: {
      borderBottomColor: colours.functional.keyline,
      borderBottomWidth: 1,
      borderTopColor: colours.functional.keyline,
      borderTopWidth: 1,
      paddingHorizontal: spacing(2),
      paddingVertical: spacing(2),
      marginBottom: spacing(4)
    },
    interactiveContainer: {
      paddingRight: spacing(2),
      paddingLeft: spacing(2),
      marginBottom: spacing(4)
    },
    primaryContainer: {
      flexDirection: "column",
      paddingBottom: spacing(5),
      width: "100%"
    }
  };
};

export default sharedStyles;

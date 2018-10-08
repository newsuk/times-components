import styleguide from "@times-components/styleguide";

const sharedStyles = scale => {
  const { colours, fontFactory, spacing } = styleguide({ scale });
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
    }
  };
};

export default sharedStyles;

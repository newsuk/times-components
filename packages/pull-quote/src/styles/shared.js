import styleguideFactory, { tabletWidth } from "@times-components/styleguide";

export default (scale, isTablet) => {
  const { colours, fontFactory, spacing } = styleguideFactory({ scale });
  return {
    articleMainContentRow: {
      paddingLeft: spacing(2)
    },
    articleMainContentRowTablet: isTablet
      ? {
          alignSelf: "center",
          width: tabletWidth
        }
      : null,
    articleTextElement: {
      ...fontFactory({
        font: "body",
        fontSize: "bodyMobile"
      }),
      color: colours.functional.primary,
      marginBottom: spacing(4)
    },
    caption: {
      ...fontFactory({
        font: "supporting",
        fontSize: "caption"
      }),
      color: "#696969",
      marginBottom: 0
    },
    captionContainer: {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      height: 20,
      marginTop: spacing(2)
    },
    container: {
      marginTop: 0
    },
    content: {
      ...fontFactory({
        font: "headlineRegular",
        fontSize: "pageComponentHeadline"
      }),
      color: colours.functional.primary
    },
    link: {
      ...fontFactory({
        font: "supporting",
        fontSize: "link"
      }),
      color: colours.functional.action,
      marginLeft: 3,
      textDecorationLine: "none"
    },
    text: {
      ...fontFactory({
        font: "supporting",
        fontSize: "caption"
      }),
      color: colours.functional.secondary,
      marginBottom: 0
    },
    twitterContainer: {
      alignItems: "center",
      borderLeftColor: colours.functional.keyline,
      borderLeftWidth: 1,
      display: "flex",
      flexDirection: "row",
      height: 15,
      marginLeft: 7,
      paddingLeft: 7
    }
  };
};

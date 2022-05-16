import {
  styleguide,
  scales,
  fonts,
  tabletWidth
} from "@times-components/ts-styleguide";
import { fontSize, margins } from "./drop-cap-sizes";

const sharedStyles = (dropCapFont = "dropCap", scale = scales.medium) => {
  const { colours, fontFactory, spacing } = styleguide({ scale });
  const dropCapMargins = margins(dropCapFont, scale);
  const dropCapFontSize = fontSize(dropCapFont, scale);

  return {
    articleMainContentRow: {
      paddingLeft: spacing(2),
      paddingRight: spacing(2)
    },
    articleMainContentRowTablet: {
      alignSelf: "center",
      width: tabletWidth
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
    dropCapContainerTablet: {
      alignSelf: "center",
      width: tabletWidth
    },
    dropCapTextElement: {
      color: colours.functional.primary,
      fontFamily: fonts[dropCapFont],
      fontSize: dropCapFontSize,
      marginBottom: dropCapMargins.bottom,
      marginRight: spacing(1),
      marginTop: dropCapMargins.top
    }
  };
};

export default sharedStyles;

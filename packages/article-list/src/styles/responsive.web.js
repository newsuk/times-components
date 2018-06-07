import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";
import { spacing } from "@times-components/styleguide";

export const ListContentContainer = withResponsiveStyles(
  View,
  {
    base: () => `
      align-self: center;
      max-width: 680px;
      padding-left: ${spacing(2)};
      padding-right: ${spacing(2)};
      width: 100%;
    `,
    mediumUp: () => `
      padding-left: 0;
      padding-right: 0;
    `,
    hugeUp: () => `
      max-width: 760px;
    `
  },
  "ListContentContainer"
);

export const ListItemWrapper = withResponsiveStyles(
  View,
  {
    base: () => `
    padding-bottom: ${spacing(3)};
    padding-top: ${spacing(3)};
  `,
    mediumUp: () => `
    .articleListImage {
      flex: 2;
      margin-bottom: 0;
      max-width: 285px;
      min-width: auto;
      padding-right: ${spacing(3)};
    }
    .articleListContent {
      flex: 2.7;
      flex-basis: 0 !important;
      min-width: 380px;
    }
  `
  },
  "ListItemWrapper"
);

export const ListItemLongText = withResponsiveStyles(
  View,
  {
    base: () => "display: none;",
    mediumUp: () => `display: block; padding-left: ${spacing(3)};`
  },
  "ListItemLongText"
);

export const ListItemShortText = withResponsiveStyles(
  View,
  {
    base: () => "display: block;",
    mediumUp: () => "display: none;"
  },
  "ListItemShortText"
);

export const PageErrorContainer = withResponsiveStyles(
  View,
  {
    base: () => `
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 10%;
    padding-right: 10%;
    padding-top: 10%;
  `,
    mediumUp: () => `
    padding-left: 15%;
    padding-right: 15%;
  `,
    wideUp: () => `
    flex-direction: row-reverse;
  `
  },
  "PageErrorContainer"
);

export const PageErrorImageContainer = withResponsiveStyles(
  View,
  {
    base: () => `
    align-self: center;
    flex-basis: 50% !important;
    max-width: 75%;
    width: 100%;
  `,
    mediumUp: () => `
    max-width: 428px;
  `,
    wideUp: () => `
    max-width: none;
  `
  },
  "PageErrorImageContainer"
);

export const PageErrorContentContainer = withResponsiveStyles(
  View,
  {
    wideUp: () => `
    align-self: center;
    max-width: 428px;
  `
  },
  "PageErrorContentContainer"
);

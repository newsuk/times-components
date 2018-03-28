import { View } from "react-native";
import withResponsiveStyles, {
  config
} from "@times-components/responsive-styles";
import { spacing } from "@times-components/styleguide";

export const ChildContainer = withResponsiveStyles(View, {
  base: () => `
    flex: 1;
    padding-left: ${spacing(2)};
    padding-right: ${spacing(2)};
  `,
  mediumUp: () => `
    flex-basis: 0 !important;
    padding-left: 0;
    padding-right: 0;
  `
});
ChildContainer.displayName = "ChildContainer";

export const getChildrenContainer = ({ childCount }) => {
  const ChildrenContainer = withResponsiveStyles(View, {
    base: () => `
      flex: 1;
      flex-direction: column;
      flex-wrap: wrap;
      padding-bottom: ${spacing(2)};
      padding-top: ${spacing(2)};
      width: 100%;
    `,
    mediumUp: () => {
      const fewItemsStyle = `
      width: ${config.mediumBpWidth};
    `;

      const multipleItemsStyle = `
        padding-left: ${spacing(4)};
        padding-right: ${spacing(4)};
        width: 100%;
      `;

      return `
        flex-direction: row;
        ${childCount >= 3 ? multipleItemsStyle : fewItemsStyle}
      `;
    },
    wideUp: () => `
      width: ${childCount >= 3 ? "100%" : config.wideBpWidth};
    `
  });
  ChildrenContainer.displayName = "ChildrenContainer";
  return ChildrenContainer;
};

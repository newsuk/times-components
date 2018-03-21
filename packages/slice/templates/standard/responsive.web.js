import { View } from "react-native";
import withResponsiveStyles, {
  config
} from "@times-components/responsive-styles";

export const ChildContainer = withResponsiveStyles(View, {
  base: () => `
    flex: 1;
    padding-left: 10px;
    padding-right: 10px;
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
      padding-bottom: 10px;
      padding-top: ${childCount >= 3 ? "15px" : "10px"};
      width: 100%;
    `,
    mediumUp: () => {
      const fewItemsStyle = `
      width: ${config.mediumBpWidth};
    `;

      const multipleItemsStyle = `
        padding-left: 20px;
        padding-right: 20px;
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

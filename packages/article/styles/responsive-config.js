import withResponsiveStyles from "@times-components/responsive-styles";

const mediumBpWidth = "83.33333333%";
const wideBpWidth = "58.33333%";

const mediumBpPositioning = `
  width: ${mediumBpWidth};
  margin: 0 auto;
  padding-left: 0;
  padding-right: 0;
`;

const articleContainerPadding = `
  padding-left: 10px;
  padding-right: 10px;
`;

const showHideToggle = (component, show, styles = "") =>
  withResponsiveStyles(component, {
    base: () => `
      display: ${show ? "flex" : "none"};
    `,
    wideUp: () => `
      display: ${show ? "none" : "flex"};
      ${styles}
    `
  });

export default {
  mediumBpWidth,
  wideBpWidth,
  mediumBpPositioning,
  articleContainerPadding,
  showHideToggle
};

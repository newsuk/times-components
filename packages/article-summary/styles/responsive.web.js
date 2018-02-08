import { withResponsiveElementStyles } from "@times-components/responsive-styles";

export default withResponsiveElementStyles("h3", {
  base: () => `
    font-size: 22px;
    line-height: 25px;
    margin-bottom: 5px;
    margin-top: 0;
  `,
  mediumUp: () => `
    font-size: 30px;
    line-height: 33px;
  `
});

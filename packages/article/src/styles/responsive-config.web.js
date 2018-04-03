import { spacing } from "@times-components/styleguide";

const mediumBpWidth = "83.33333333%";
const wideBpWidth = "58.33333%";

const mediumBpPositioning = `
  width: ${mediumBpWidth};
  margin: 0 auto;
  padding-left: 0;
  padding-right: 0;
`;

const articleContainerPadding = `
  padding-left: ${spacing(2)};
  padding-right: ${spacing(2)};
`;

export default {
  mediumBpWidth,
  wideBpWidth,
  mediumBpPositioning,
  articleContainerPadding
};

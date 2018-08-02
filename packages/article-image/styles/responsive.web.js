import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";
import { spacing } from "@times-components/styleguide";

export const InsetCaptionContainerStyle = withResponsiveStyles(View, {
  base: () => `
    display: inline-block;
    margin-top: ${spacing(-2)};
    padding-bottom: ${spacing(4)};
    padding-left: ${spacing(2)};
    padding-right: ${spacing(2)};
    padding-top: 0;
    vertical-align: top;
    width: 50%;
  `,
  mediumUp: () => `
    clear: left;
    float: left;
    margin-top: 0px;
    padding-bottom: ${spacing(4)};
    padding-left: 0px;
    padding-top: 0px;
    padding-right: ${spacing(4)};
    width: 30%;
  `,
  wideUp: () => `
    padding-left: 0px;
    width: 35.71429%;
  `
});

export const InsetImageStyle = withResponsiveStyles(View, {
  base: () => `
    display: inline-block;
    padding-bottom: ${spacing(4)};
    vertical-align: top;
    width: 50%;`,
  mediumUp: () => `
    clear: left;
    float: left;
    padding-bottom: 0px;
    padding-top: ${spacing(1)};
    padding-right: ${spacing(4)};
    width: 30%;`,
  wideUp: () => `
    clear: left;
    width: 35.71429%;`
});

export const InsetCaptionStyle = withResponsiveStyles(View, {
  base: () => `padding-left: ${spacing(2)};`,
  mediumUp: () => "padding-left: 0px;"
});

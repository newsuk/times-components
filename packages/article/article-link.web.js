import React from "react";
import { Colours } from "@times-components/styleguide";
import Link from "@times-components/link";

const responsivelinkStyles = {
  base: `
      color: ${Colours.linkBlue};
      font-family: "TimesDigitalW04-Regular";
      line-height: 26px;
      font-size: 17px;
      margin-bottom: 25px;
      margin-top: 0;
  `,
  medium: `
      font-size: 18px;
      line-height: 30px;
  `
};

const ArticleLink = props => (
  <Link
    index={`link-${props.uuid}`}
    url={props.url}
    onPress={props.onPress}
    responsivelinkStyles={responsivelinkStyles}
  >
    {props.children}
  </Link>
);

ArticleLink.defaultProps = {
  ...Link.defaultProps
};

ArticleLink.propTypes = {
  ...Link.propTypes
};
export default ArticleLink;

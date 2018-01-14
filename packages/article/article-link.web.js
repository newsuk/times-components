import React from "react";
import Link from "@times-components/link";

const responsivelinkStyles = {
  base: `
      color: #069;
      font-family: "TimesDigitalW04-Regular";
      line-height: 26px;
      font-size: 17px;
      margin-bottom: 25px;
      margin-top: 0;
      text-decoration: underline;
  `,
  medium: `
      font-size: 18px;
      line-height: 30px;
  `
};

const ArticleLink = props => (
  <Link
    index={`link-${props.uuid}`}
    url={props.href}
    onPress={() => {}}
    responsivelinkStyles={responsivelinkStyles}
  >
    {props.linkText}
  </Link>
);

ArticleLink.defaultProps = {
  ...Link.defaultProps
};

export default ArticleLink;

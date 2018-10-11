import React from "react";
import Link from "@times-components/link";
import { colours, fonts, fontSizes } from "@times-components/styleguide";

const responsiveLinkStyles = {
  base: `
      color: ${colours.functional.action};
      font-family: "${fonts.bodyRegular}";
      line-height: 26px;
      font-size: ${fontSizes.bodyMobile}px;
      margin-bottom: 25px;
      margin-top: 0;
  `,
  medium: `
      font-size: ${fontSizes.body}px;
      line-height: 30px;
  `
};

const ArticleLink = ({ children, target, url }) => (
  <Link responsiveLinkStyles={responsiveLinkStyles} target={target} url={url}>
    {children}
  </Link>
);

ArticleLink.defaultProps = {
  ...Link.defaultProps
};

ArticleLink.propTypes = {
  ...Link.propTypes
};
export default ArticleLink;

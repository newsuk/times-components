import React from "react";
import Context from "@times-components/context";
import { TextLink } from "@times-components/link";
import styleFactory from "../styles/article-body";

const ArticleLink = props => (
  <Context.Consumer>
    {({ theme: { scale } }) => {
      const styles = styleFactory(scale);
      return (
        <TextLink
          onPress={props.onPress}
          style={styles.articleLink}
          url={props.url}
        >
          {props.children}
        </TextLink>
      );
    }}
  </Context.Consumer>
);

ArticleLink.defaultProps = {
  ...TextLink.defaultProps
};

ArticleLink.propTypes = {
  ...TextLink.propTypes
};
export default ArticleLink;

import React from "react";
import Context from "@times-components/context";
import Link from "@times-components/link";
import RelatedArticleItem from "./related-article-item.base";

export default props => (
  <RelatedArticleItem {...props}>
    {({ article, card }) => (
      <Context.Consumer>
        {({ makeArticleUrl }) => (
          <Link linkStyle={{ padding: 10 }} url={makeArticleUrl(article)}>
            {card}
          </Link>
        )}
      </Context.Consumer>
    )}
  </RelatedArticleItem>
);

import React from "react";
import Context from "@times-components/context";
import Link from "@times-components/link";
import RelatedArticleItem from "./related-article-item.base";
import relatedArticlesItemTrackingEvents from "./related-articles-item-tracking-events";

const RelatedArticleItemWeb = props => (
  <div data-testid="related-article-item">
    <RelatedArticleItem {...props}>
      {({ article, card, onPress }) => (
        <Context.Consumer>
          {() => (
            <Link
              linkStyle={{ padding: 10 }}
              onPress={e => onPress(e, { url: article.url })}
              url={article.url}
            >
              {card}
            </Link>
          )}
        </Context.Consumer>
      )}
    </RelatedArticleItem>
  </div>
);
RelatedArticleItemWeb.displayName = "RelatedArticleItem";

export default relatedArticlesItemTrackingEvents(RelatedArticleItemWeb);

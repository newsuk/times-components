import React from "react";
import Link from "@times-components/link";
import RelatedArticleItem from "./related-article-item.base";

export default props => (
  <RelatedArticleItem {...props}>
    {({ article: { url }, card, onPress }) => (
      <Link
        linkStyle={{ padding: 10 }}
        onPress={e => onPress(e, { url })}
        url={url}
      >
        {card}
      </Link>
    )}
  </RelatedArticleItem>
);

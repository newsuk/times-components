import React, { Fragment } from "react";
import LazyLoad from "@times-components/lazy-load";
import RelatedArticles from "@times-components/related-articles";
import { spacing } from "@times-components/styleguide";
import ArticleBody from "./article-body/article-body";
import ArticleTopics from "./article-topics";
import { articlePropTypes, articleDefaultProps } from "./article-prop-types";

import { BodyContainer } from "./styles/responsive";

const Article = props => {
  const {
    analyticsStream,
    data: { content, section, url, topics, relatedArticleSlice },
    header
  } = props;

  // eslint-disable-next-line react/prop-types
  const displayRelatedArticles = ({ isVisible }) =>
    relatedArticleSlice ? (
      <RelatedArticles
        analyticsStream={analyticsStream}
        isVisible={isVisible}
        slice={{
          ...relatedArticleSlice,
          sliceName: relatedArticleSlice.__typename // eslint-disable-line no-underscore-dangle
        }}
      />
    ) : null;

  return (
    <LazyLoad rootMargin={spacing(10)} threshold={0.5}>
      {({ observed, registerNode }) => (
        <Fragment>
          {header()}
          <BodyContainer>
            <ArticleBody
              content={content}
              contextUrl={url}
              observed={observed}
              registerNode={registerNode}
              section={section}
            />
          </BodyContainer>
          <ArticleTopics topics={topics} />
          <aside id="related-articles" ref={node => registerNode(node)}>
            {displayRelatedArticles({
              isVisible: !!observed.get("related-articles")
            })}
          </aside>
        </Fragment>
      )}
    </LazyLoad>
  );
};

Article.propTypes = articlePropTypes;
Article.defaultProps = articleDefaultProps;

export default Article;

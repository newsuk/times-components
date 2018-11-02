import React, { Fragment } from "react";
import { AdComposer } from "@times-components/ad";
import LazyLoad from "@times-components/lazy-load";
import RelatedArticles from "@times-components/related-articles";
import { spacing } from "@times-components/styleguide";
import ArticleBody from "./article-body/article-body";
import ArticleTopics from "./article-topics";
import { articlePropTypes, articleDefaultProps } from "./article-prop-types";

import { BodyContainer } from "./styles/responsive";

const Article = props => {
  const {
    adConfig,
    analyticsStream,
    data: { content, section, url, topics, relatedArticleSlice },
    header,
    receiveChildList
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

  receiveChildList([
    {
      elementId: "related-articles",
      name: "related articles"
    }
  ]);

  return (
    <AdComposer adConfig={adConfig}>
      <LazyLoad rootMargin={spacing(10)} threshold={0.5}>
        {({ observed, registerNode }) => (
          <Fragment>
            {header}
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
    </AdComposer>
  );
};

Article.propTypes = articlePropTypes;
Article.defaultProps = articleDefaultProps;

export default Article;

import React, { useEffect, useState } from 'react';
import { storiesOf } from '@storybook/react';

import {
  AlgoliaSearchProvider,
  useAlgoliaSearch
} from './AlgoliaSearchProvider';
import analyticsStream from '../../fixtures/analytics-actions/analytics-actions';
import {
  AlgoliaArticle,
  SearchRelatedArticlesResult
} from './algoliaRelatedArticles';
import { InArticleRelatedArticles } from '../../components/in-article-related-articles/InArticleRelatedArticles';
import { RelatedArticleType } from '../../components/in-article-related-articles/RelatedArticle';

const App = () => {
  const { getRelatedArticles } = useAlgoliaSearch();

  const [results, setResults] = useState<SearchRelatedArticlesResult | null>();

  useEffect(
    () => {
      // tslint:disable-next-line:no-console
      console.log('article.,getRelatedArticles', getRelatedArticles);
      if (getRelatedArticles) {
        getRelatedArticles().then(searchResults => setResults(searchResults));
      }
    },
    [getRelatedArticles]
  );

  const relatedArticles: RelatedArticleType[] = results
    ? results.items.map(result => ({
        label: result.article.label,
        headline: result.article.headline,
        link: result.article.url,
        image:
          result.article.leadAsset &&
          result.article.leadAsset.crop169 &&
          result.article.leadAsset.crop169.url
      }))
    : [];

  // tslint:disable-next-line:no-console
  console.log({ results });
  // tslint:disable-next-line:no-console
  console.log({ relatedArticles });

  return (
    <div>
      <InArticleRelatedArticles
        relatedArticles={relatedArticles!}
        sectionColour="coral"
        heading="Algolia Results"
      />
    </div>
  );
};

const algoliaSearchKeys = {
  applicationId: process.env.STORYBOOK_ALGOLIA_ID || '',
  apiKey: process.env.STORYBOOK_ALGOLIA_KEY || '',
  indexName: process.env.STORYBOOK_ALGOLIA_INDEX || ''
};

storiesOf('Typescript Component/Algolia/Helper', module).add(
  'Related Articles',
  () => {
    const [id, setID] = useState('');
    const [headline, setHeadline] = useState('');
    const [section, setSection] = useState('');
    const [label, setLabel] = useState('');
    const [topics, setTopics] = useState('');
    const [byline, setByline] = useState('');
    const [article, setArticle] = useState<AlgoliaArticle | null>(null);

    const handleSearchClick = () => {
      setArticle({
        id,
        section,
        label,
        topics: topics.split(',').map(name => ({ name })),
        headline,
        bylines: [
          {
            byline: [
              {
                attributes: {},
                children: [
                  {
                    attributes: {
                      value: byline
                    },
                    children: [],
                    name: 'text'
                  }
                ],
                name: 'inline'
              }
            ]
          }
        ]
      });
    };
    const handleClearClick = () => {
      return;
    };

    return (
      <AlgoliaSearchProvider
        algoliaSearchKeys={algoliaSearchKeys}
        article={article}
        analyticsStream={analyticsStream}
      >
        <div className="App">
          <div className="form">
            <div>
              <span>id</span>
              <input value={id} onChange={evt => setID(evt.target.value)} />
            </div>
            <div>
              <span>Headline</span>
              <input
                value={headline}
                onChange={evt => setHeadline(evt.target.value)}
              />
            </div>
            <div>
              <span>Section</span>
              <input
                value={section}
                onChange={evt => setSection(evt.target.value)}
              />
            </div>
            <div>
              <span>Label</span>
              <input
                value={label}
                onChange={evt => setLabel(evt.target.value)}
              />
            </div>
            <div>
              <span>Topics</span>
              <input
                value={topics}
                onChange={evt => setTopics(evt.target.value)}
              />
            </div>
            <div>
              <span>Byline</span>
              <input
                value={byline}
                onChange={evt => setByline(evt.target.value)}
              />
            </div>
            <div className="buttons">
              <button onClick={handleSearchClick}>Search</button>
              <button onClick={handleClearClick}>Clear</button>
            </div>
          </div>
          <div>
            <App />
          </div>
        </div>
      </AlgoliaSearchProvider>
    );
  }
);

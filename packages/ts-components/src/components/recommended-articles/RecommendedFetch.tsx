declare global {
  interface Window {
    nuk: any;
    __TIMES_CONFIG__: any;
  }
}

import startCase from 'lodash.startcase';
import React, { useEffect, useState } from 'react';

import { FetchProvider } from '../../helpers/fetch/FetchProvider';
import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';
import { RecommendedArticles } from './RecommendedArticles';

const isValidEnvironment = (name: string) =>
  ['local-prod', 'pr', 'uat', 'staging', 'prod'].includes(name);

export const RecommendedFetch: React.FC<{
  articleId: string;
  articleHeadline: string;
  articleSection: string;
}> = ({ articleId, articleHeadline, articleSection }) => {
  const [isClientSide, setIsClientSide] = useState<boolean>(false);

  useEffect(() => {
    try {
      const acsCookie = window.nuk.getCookieValue('acs_tnl');
      const envName = window.__TIMES_CONFIG__.environmentName;

      if (acsCookie && isValidEnvironment(envName)) {
        setIsClientSide(true);
      }
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log(e);
    }
  }, []);

  const heading = `Today's ${startCase(articleSection)}`;

  return isClientSide ? (
    <FetchProvider
      url={`/api/recommended-articles/${articleId}/todays_section`}
    >
      <TrackingContextProvider
        context={{
          object: 'RecommendedArticles',
          attrs: {
            event_navigation_action: 'navigation',
            event_navigation_name: 'widget:relevant article',
            event_navigation_browsing_method: 'click',
            section_details: `section : ${articleSection}`,
            article_name: articleHeadline,
            widget_headline: heading.toLowerCase(),
            widget_section: articleSection,
            widget_type: "today's section"
          }
        }}
      >
        <RecommendedArticles heading={heading} />
      </TrackingContextProvider>
    </FetchProvider>
  ) : null;
};

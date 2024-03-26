import React from 'react';
import { ShareItem, ShareItemLabel } from './share-item';
// @ts-ignore
import { IconEmail, IconActivityIndicator } from '@times-components/icons';

import getTokenisedShareUrl from '../utils/get-tokenised-article-url-api';

import type { EmailShareProps } from '../types';

import styles from '../styles';

export const EmailShare = ({
  publicationName = 'TIMES',
  ...props
}: EmailShareProps) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const onShare = (e: React.MouseEvent<HTMLElement>) => {
    const { articleId, shouldTokenise, articleUrl } = props;

    e.preventDefault();

    if (shouldTokenise) {
      setIsLoading(true);

      getTokenisedShareUrl(articleId)
        .then((res: any) => {
          const { data } = res;
          if (data && data.article) {
            setIsLoading(false);
            openMailClient(data.article.tokenisedUrl);
          }
        })
        .catch(() => {
          setIsLoading(false);
        });
    } else {
      const matches = window.location.search.match(/[?&]shareToken=([^&]+)/);

      openMailClient(
        matches ? `${articleUrl}?shareToken=${matches[1]}` : articleUrl
      );
    }
  };

  const openMailClient = (url: string) => {
    const { articleHeadline } = props;
    const publication =
      publicationName !== 'TIMES' ? 'The Sunday Times' : 'The Times';

    const mailtoEmailUrl = `mailto:?subject=${articleHeadline} from ${publication}&body=I thought you would be interested in this story from ${publication}%0A%0A${articleHeadline}%0A%0A${url}`;

    window.location.assign(mailtoEmailUrl);
  };

  return (
    <ShareItem
      tooltipContent="Share by email"
      onClick={onShare}
      testId="email-share"
    >
      <ShareItemLabel
        icon={
          isLoading ? (
            <IconActivityIndicator size="small" />
          ) : (
            <IconEmail
              fillColour="currentColor"
              height={styles.svgIcon.height}
              title="Share by email"
            />
          )
        }
      >
        Email
      </ShareItemLabel>
    </ShareItem>
  );
};

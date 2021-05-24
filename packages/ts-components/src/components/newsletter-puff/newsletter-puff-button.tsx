import React from 'react';

import Button from '@times-components/button';

import { buttonStyles, textStyle } from './styles';

type NewsletterPuffProps = {
  onPress: () => void;
  updatingSubscription?: boolean;
};

export const NewsletterPuffButton = ({
  updatingSubscription = false,
  onPress
}: NewsletterPuffProps) => (
  <Button
    title={updatingSubscription ? 'Saving…' : 'Sign up now'}
    onPress={onPress}
    style={buttonStyles}
    underlayColor="transparent"
    textStyle={textStyle}
  />
);

export const PreviewNewsletterPuffButton = () => (
  <NewsletterPuffButton
    onPress={() => {
      return;
    }}
  />
);

// @ts-ignore
const clickEvent = (newsletterPuffName: string) => ({
  article_parent_name: `${newsletterPuffName}`,
  event_navigation_name: 'widget : puff : sign up now',
  event_navigation_browsing_method: 'click',
  event_navigation_action: 'navigation'
  // event_navigation_name: 'widget : puff : sign up now : displayed',
  // event_navigation_browsing_method: 'automated'
});

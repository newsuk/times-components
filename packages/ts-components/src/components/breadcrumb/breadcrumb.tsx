import React from 'react';
import { Breadcrumbs, BreadcrumbItem, IconContainer, styleMap } from './styles';
import BreadcrumbIcon from './assets/BreadcrumbIcon';
import {
  TrackingContext,
  TrackingContextProvider
} from '../../helpers/tracking/TrackingContextProvider';

type BreadcrumbsItem = {
  title: string;
  url?: string;
};

type BreadcrumbProps = {
  data: BreadcrumbsItem[];
};

export const Breadcrumb = ({ data }: BreadcrumbProps) => {
  const clickEvent = (title: string) => ({
    object: 'Breadcrumb',
    action: 'Clicked',
    attrs: {
      event_navigation_action: 'navigation',
      event_navigation_name: 'header:selection',
      event_navigation_browsing_method: 'click',
      article_parent_name: `breadcrumb : ${title}`
    }
  });

  const handleClick = (
    fireAnalyticsEvent: (evt: TrackingContext) => void,
    title: string
  ) => {
    fireAnalyticsEvent && fireAnalyticsEvent(clickEvent(title));
  };

  const getBreadcrumbSeparator = (index: number, arr: any[]) =>
    index < arr.length - 1;

  return (
    <TrackingContextProvider>
      {({ fireAnalyticsEvent }) => (
        <Breadcrumbs aria-label="breadcrumbs">
          {data.map((breadcrumbItem, breadcrumbIndex, breadcrumbArr) => {
            const showSeparator = getBreadcrumbSeparator(
              breadcrumbIndex,
              breadcrumbArr
            );
            return showSeparator ? (
              <>
                <BreadcrumbItem
                  key={breadcrumbItem.title}
                  aria-current="false"
                  href={breadcrumbItem.url}
                  selected={false}
                  onClick={() =>
                    handleClick(fireAnalyticsEvent, breadcrumbItem.title)
                  }
                >
                  {breadcrumbItem.title + 'EXAMPLE'}
                </BreadcrumbItem>
                <IconContainer>
                  <BreadcrumbIcon color={styleMap.colors.inkNonEssential} />
                </IconContainer>
              </>
            ) : (
              <BreadcrumbItem
                aria-current="page"
                key={breadcrumbItem.title}
                href={breadcrumbItem.url}
                selected={true}
                onClick={() =>
                  handleClick(fireAnalyticsEvent, breadcrumbItem.title)
                }
              >
                {breadcrumbItem.title}
              </BreadcrumbItem>
            );
          })}
        </Breadcrumbs>
      )}
    </TrackingContextProvider>
  );
};

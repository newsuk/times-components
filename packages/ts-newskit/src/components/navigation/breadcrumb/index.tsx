import React from 'react';
import { Breadcrumbs, BreadcrumbItem } from 'newskit';
import {
  TrackingContext,
  TrackingContextProvider
} from '../../../utils/TrackingContextProvider';

type BreadcrumbsItem = {
  title: string;
  url?: string;
};

type BreadcrumbProps = {
  data: BreadcrumbsItem[];
};

export const Breadcrumb = ({ data }: BreadcrumbProps) => {
  const clickEvent = (title: string) => ({
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

  return (
    <TrackingContextProvider>
      {({ fireAnalyticsEvent }) => (
        <Breadcrumbs
          size="small"
          overrides={{
            separator: {
              stylePreset: 'breadcrumbSeparator'
            }
          }}
        >
          {data.map((breadcrumbItem, breadcrumbIndex, breadcrumbArr) => {
            const isLastItem = breadcrumbIndex + 1 === breadcrumbArr.length;
            return (
              <BreadcrumbItem
                key={breadcrumbItem.title}
                href={isLastItem ? undefined : breadcrumbItem.url}
                selected={isLastItem}
                overrides={{
                  stylePreset: 'breadcrumbStyle',
                  typographyPreset: 'breadcrumbText'
                }}
                onClick={() =>
                  !isLastItem &&
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

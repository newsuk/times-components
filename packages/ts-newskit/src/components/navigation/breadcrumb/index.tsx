import React from 'react';
import { Breadcrumbs, BreadcrumbItem } from 'newskit';
import {
  TrackingContextProvider,
  TrackingContext
} from '../../../utils/TrackingContextProvider';

type BreadcrumbsItem = {
  title: string;
  url?: string;
};

interface BreadcrumbProps {
  data: BreadcrumbsItem[];
}

export const Breadcrumb = ({ data }: BreadcrumbProps) => {
  const clickEvent = ({ crumb }: any) => ({
    action: 'Clicked',
    attrs: {
      event_navigation_action: 'navigation',
      event_navigation_name: 'title block link',
      event_navigation_browsing_method: 'click',
      article_parent_name: crumb
    }
  });

  const handleClick = (fireAnalyticsEvent: (evt: TrackingContext) => void, crumb: any) => {
    fireAnalyticsEvent && fireAnalyticsEvent(clickEvent(crumb));
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
      {data.map((breadcrumbItem, breadcrumbIndex, breadcrumbArr) => (
        <BreadcrumbItem
          key={breadcrumbItem.title}
          onClick={() => handleClick(fireAnalyticsEvent, breadcrumbItem.title)}
          href={
            breadcrumbIndex + 1 === breadcrumbArr.length
              ? undefined
              : breadcrumbItem.url
          }
          selected={breadcrumbIndex + 1 === breadcrumbArr.length}
          overrides={{
            stylePreset: 'breadcrumbStyle',
            typographyPreset: 'breadcrumbText'
          }}
        >
          {breadcrumbItem.title}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
      )}
      </TrackingContextProvider>
  );
};

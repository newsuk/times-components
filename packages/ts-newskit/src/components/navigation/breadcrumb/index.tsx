import React from 'react';
import { Breadcrumbs } from 'newskit';
import styled from 'styled-components';
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

  const styleMap = {
    colors: {
      blue070: "#006699",
      inkContrast: "#01000d",
      inkSubtle: "#696969",
      inkNonEssential:"#aaaaaa"
    }
  }
  
  // const breadcrumbStylePresets = {
  //   breadcrumbSeparator: {
  //     base: {
  //       color: '{{colors.inkNonEssential}}'
  //     }
  //   }
  // };

const StyledBreadcrumbLink = styled.a<{selected: boolean}>`
  color: inherit;
  text-decoration: none;
  display: inline-grid;
  font-family: Roboto-Regular;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.250;
  letter-spacing: 0%;
  font-stretch: normal
  display: inline-grid;
  background-color: transparent;
  min-height: 32px;
  border: none;
  place-content: center;
  color: ${({ selected }) => selected ? styleMap.colors.inkContrast : styleMap.colors.inkSubtle}
  &:hover {
    color: ${styleMap.colors.blue070}
  };
`;
  

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
                <StyledBreadcrumbLink key={breadcrumbItem.title} href={breadcrumbItem.url} selected={isLastItem} onClick={() => handleClick(fireAnalyticsEvent, breadcrumbItem.title)}>{breadcrumbItem.title}</StyledBreadcrumbLink>
            );
          })}
        </Breadcrumbs>
      )}
    </TrackingContextProvider>
  );
};

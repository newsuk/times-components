import React from 'react';
import styled from 'styled-components';
import { BreadCrumbIconSeparator } from '../../../assets';
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

  const styleMap = {
    colors: {
      blue070: "#006699",
      inkContrast: "#01000d",
      inkSubtle: "#696969",
      inkNonEssential:"#aaaaaa"
    }
  }

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
  color: ${({ selected }) => selected ? styleMap.colors.inkContrast : styleMap.colors.inkSubtle};
  &:hover {
    color: ${styleMap.colors.blue070}
  };
`;

const StyledBreadCrumbNav = styled.nav`
  display: flex;
`;

const IconContainer = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
   padding-inline: 8px;
`;

const getBreadcrumbSeparator = (
  index: number,
  arr: any[],
) => index < arr.length - 1;
  
  return (
    <TrackingContextProvider>
      {({ fireAnalyticsEvent }) => (
        <StyledBreadCrumbNav>
          {data.map((breadcrumbItem, breadcrumbIndex, breadcrumbArr) => {
            const isLastItem = breadcrumbIndex + 1 === breadcrumbArr.length;
            const showSeparator = getBreadcrumbSeparator(breadcrumbIndex, breadcrumbArr);
            return (
              showSeparator ? (
                <>
                <StyledBreadcrumbLink key={breadcrumbItem.title} href={breadcrumbItem.url} selected={isLastItem} onClick={() => handleClick(fireAnalyticsEvent, breadcrumbItem.title)}>{breadcrumbItem.title}</StyledBreadcrumbLink>
                <IconContainer><BreadCrumbIconSeparator color={styleMap.colors.inkNonEssential}/></IconContainer>
                </>
              ) : (<StyledBreadcrumbLink key={breadcrumbItem.title} href={breadcrumbItem.url} selected={isLastItem} onClick={() => handleClick(fireAnalyticsEvent, breadcrumbItem.title)}>{breadcrumbItem.title}</StyledBreadcrumbLink>)
                
            )
          })}
        </StyledBreadCrumbNav>
      )}
    </TrackingContextProvider>
  );
};

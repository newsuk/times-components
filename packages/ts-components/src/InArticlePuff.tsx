import React from 'react';

import styled from 'styled-components';

import {
  withTrackingContext,
  withTrackEvents
} from '@times-components/tracking';

import {
  breakpoints,
  colours,
  fonts,
  spacing
} from '@times-components/styleguide';

import { IconForwardArrow } from '@times-components/icons';
import withTrackScrolled from './tracking/trackScrolled';

type InArticlePuffProps = {
  label: string;
  imageUri?: string;

  headline: string;
  copy: string;
  link: string;
  linkText: string;
  onClick?: () => void;
  receiveChildList?: (
    children: {
      elementId: string;
      name: string;
      eventNavigationName?: string;
    }[]
  ) => void;
};

type ContainerType = {
  imageUri?: string;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  border-top: 2px #13354e solid;
  padding: 20px;
  margin-right: ${spacing(2)};
  margin-bottom: ${spacing(4)};
  margin-left: ${spacing(2)};
  @media (min-width: ${breakpoints.medium}px) {
    flex-direction: row;
    width: 80.8%;
    margin: 0 auto ${spacing(4)};
  }
  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
  }
`;

const ImageContainer = styled.div`
  padding-bottom: 13px;
  @media (min-width: ${breakpoints.medium}px) {
    width: 50%;
    padding-right: 20px;
    padding-bottom: 0px;
  }
`;

const Label = styled.span`
  font-family: ${fonts.supporting};
  font-size: 12px;
  color: #13354e;
  padding-bottom: 8px;
  @media (min-width: ${breakpoints.medium}px) {
    padding-bottom: 12px;
  }
`;

const Headline = styled.span`
  font-family: ${fonts.headline};
  font-size: 24px;
  padding-bottom: 8px;
  @media (min-width: ${breakpoints.wide}px) {
    font-size: 28px;
  }
`;

const Copy = styled.span`
  font-family: ${fonts.body};
  color: ${colours.functional.secondary};
  font-size: 16px;
  padding-bottom: 20px;
`;

const LinkText = styled.span`
  font-family: ${fonts.supporting};
  font-size: 16px;
  color: #bf0000;
  margin-right: 16px;
`;

const ContentContainer = styled.div<ContainerType>`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  @media (min-width: ${breakpoints.medium}px) {
    width: ${(props: ContainerType) => (props.imageUri ? '50%' : '100%')};
  }
`;

const MainContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const LinkWrapper = styled.a`
  display: flex;
  flex-direction: row;
  align-items: top;
  width: fit-content;
  text-decoration: none;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
`;

const InArticlePuff: React.FC<InArticlePuffProps> = React.forwardRef<
  HTMLDivElement,
  InArticlePuffProps
>(
  (
    {
      label,
      imageUri,
      headline,
      copy,
      link,
      linkText,
      onClick = () => {},
      receiveChildList
    },
    ref
  ) => {
    receiveChildList &&
      receiveChildList([
        {
          elementId: 'last-paragraph',
          name: 'end of article',
          eventNavigationName: 'Article : View End'
        },
        {
          elementId: 'related-articles',
          name: 'related articles'
        }
      ]);

    const handleClick = () => onClick();

    return (
      <Container ref={ref}>
        {imageUri ? (
          <ImageContainer onClick={handleClick}>
            <Image src={imageUri} />
          </ImageContainer>
        ) : null}
        <ContentContainer imageUri={imageUri}>
          <MainContentContainer onClick={handleClick}>
            <Label>{label}</Label>
            <Headline>{headline}</Headline>
            <Copy>{copy}</Copy>
          </MainContentContainer>
          <LinkWrapper href={link} onClick={handleClick}>
            <LinkText>{linkText}</LinkText>
            <IconForwardArrow fillColour="#BF0000" height={18} width={8} />
          </LinkWrapper>
        </ContentContainer>
      </Container>
    );
  }
);

type Props = { [prop: string]: any };
const scrollEvent = {
  trackingName: 'InArticlePuff',
  getAttrs: ({ headline }: Props) => ({
    article_parent_name: `${headline}`,
    event_navigation_name: 'in article puff displayed',
    event_navigation_browsing_method: 'automated'
  })
};
const clickEvent = {
  actionName: 'onClick',
  eventName: 'onClick',
  trackingName: 'InArticlePuff',
  getAttrs: ({ headline }: Props) => ({
    article_parent_name: `${headline}`,
    event_navigation_name: 'in article puff cta clicked',
    event_navigation_browsing_method: 'click'
  })
};

let TrackedComponent = withTrackEvents(
  withTrackScrolled(InArticlePuff, scrollEvent),
  {
    analyticsEvents: [clickEvent]
  }
);

export default withTrackingContext(TrackedComponent, {
  getAttrs: ({ headline }: Props) => ({
    article_parent_name: `${headline}`
  }),
  trackingName: 'InArticlePuff',
  trackingObjectName: 'InArticlePuff'
});

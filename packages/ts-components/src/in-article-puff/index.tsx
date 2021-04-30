import React, { useState } from 'react';
import {
  withTrackEvents,
  withTrackingContext
} from '@times-components/tracking';

import { IconForwardArrow } from '@times-components/icons';
import withTrackScrolled from '../tracking/trackScrolledIntoView';

import {
  Container,
  Image,
  ImageContainer,
  ContentContainer,
  MainContentContainer,
  Label,
  Headline,
  Copy,
  LinkWrapper,
  LinkText
} from './styles';

interface InArticlePuffProps {
  label: string;
  imageUri?: string;
  headline: string;
  copy: string;
  link: string;
  linkText: string;
  onClick?: () => void;
}

const InArticlePuff: React.FC<InArticlePuffProps> = React.forwardRef<
  HTMLDivElement,
  InArticlePuffProps
>(({ label, imageUri, headline, copy, link, linkText, onClick }, ref) => {
  const [colour, setColour] = useState('#BF0000');
  const handleClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    onClick && onClick();
    evt.preventDefault();
    return false;
  };

  return (
    <Container ref={ref}>
      {imageUri ? (
        <ImageContainer href={link} onClick={handleClick}>
          <Image src={imageUri} />
        </ImageContainer>
      ) : null}
      <ContentContainer imageUri={imageUri}>
        <MainContentContainer>
          <Label imageUri={imageUri}>{label}</Label>
          <Headline href={link} onClick={handleClick}>
            {headline}
          </Headline>
          <Copy>{copy}</Copy>
        </MainContentContainer>
        <LinkWrapper
          href={link}
          imageUri={imageUri}
          onMouseOver={() => setColour('#696969')}
          onMouseLeave={() => setColour('#BF0000')}
          onClick={handleClick}
        >
          <LinkText>{linkText}</LinkText>
          <IconForwardArrow fillColour={colour} height={18} width={8} />
        </LinkWrapper>
      </ContentContainer>
    </Container>
  );
});

interface Props {
  [prop: string]: any;
}

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

TrackedComponent = withTrackingContext(TrackedComponent, {
  getAttrs: ({ headline }: Props) => ({
    article_parent_name: `${headline}`
  }),
  trackingName: 'InArticlePuff',
  trackingObjectName: 'InArticlePuff'
});

export default TrackedComponent;

import React from 'react';
import {
  NewsKitBanner,
  Body,
  CloseIconWrapper,
  Title,
  TitleWrapper,
  Wrapper,
  BannerWrapper
} from './styles';
import { EmailIcon } from './emailIcon';
import { CloseIcon } from './closeIcon';

type Props = {
  onClose: () => void;
  title: string;
  body: string;
};

export const Banner: React.FC<Props> = ({ title, body, onClose }) => {
  return (
    <BannerWrapper>
      <NewsKitBanner aria-label="Email verification banner">
        <Wrapper>
          <TitleWrapper>
            <EmailIcon />
            <Title>{title}</Title>
          </TitleWrapper>
          <CloseIconWrapper onClick={onClose}>
            <CloseIcon />
          </CloseIconWrapper>
        </Wrapper>
        <Body>{body}</Body>
      </NewsKitBanner>
    </BannerWrapper>
  );
};

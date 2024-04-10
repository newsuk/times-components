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
import { EmailIcon } from '../../../assets/emailIcon';
import { CloseIconBlack } from '../../../assets/closeIconBlack';

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
            <CloseIconBlack />
          </CloseIconWrapper>
        </Wrapper>
        <Body>{body}</Body>
      </NewsKitBanner>
    </BannerWrapper>
  );
};

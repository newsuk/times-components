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
import { NewsKitCloseIconBlack, NewsKitEmailIcon } from '../../../assets';

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
            <NewsKitEmailIcon />
            <Title>{title}</Title>
          </TitleWrapper>
          <CloseIconWrapper onClick={onClose}>
            <NewsKitCloseIconBlack width={14} height={14} />
          </CloseIconWrapper>
        </Wrapper>
        <Body>{body}</Body>
      </NewsKitBanner>
    </BannerWrapper>
  );
};

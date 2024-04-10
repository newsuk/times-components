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
import EmailIcon from '../../../assets/EmailIcon';
import CloseIcon from '../../../assets/CloseIcon2';

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

          {/* can be refactored */}
          <CloseIconWrapper onClick={onClose}>
            <CloseIcon width={14} height={14} />
          </CloseIconWrapper>
        </Wrapper>
        <Body>{body}</Body>
      </NewsKitBanner>
    </BannerWrapper>
  );
};

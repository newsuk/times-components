import React from 'react';
import {
  Body,
  CloseIconWrapper,
  Title,
  TitleWrapper,
  Wrapper,
  StyledBanner,
  BannerWrapper,
  BannerContentWrapper
} from './styles';
import { CloseIconBlack, EmailIcon } from '../../../assets';

type Props = {
  onClose: () => void;
  title: string;
  body: string;
};

export const Banner: React.FC<Props> = ({ title, body, onClose }) => {
  return (
    <BannerWrapper>
      <StyledBanner aria-label="Email verification banner">
        <BannerContentWrapper role="region">
          <Wrapper>
            <TitleWrapper>
              <EmailIcon />
              <Title>{title}</Title>
            </TitleWrapper>
            <CloseIconWrapper onClick={onClose}>
              <CloseIconBlack width={14} height={14} />
            </CloseIconWrapper>
          </Wrapper>
          <Body>{body}</Body>
        </BannerContentWrapper>
      </StyledBanner>
    </BannerWrapper>
  );
};

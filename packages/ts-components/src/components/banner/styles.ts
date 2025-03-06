import styled from 'styled-components';
import { breakpoints } from '@times-components/ts-styleguide';

export const BannerWrapper = styled.div`
  max-width: 498px;
  box-shadow: 0px 16px 24px 0px rgba(17, 17, 17, 0.08);
  z-index: 100;
  width: 100%;
`;

export const StyledBanner = styled.div`
  border-top: 3px solid #005c8a;
  background-color: #fff;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 16px;
  padding-block: 12px;
  padding-right: 16px;
  @media screen and (min-width: ${breakpoints.wide}px) {
    padding-block: 10px;
  }
  @media screen and (min-width: ${breakpoints.medium}px) {
    padding-right: 30px;
  }
`;

export const BannerContentWrapper = styled.div`
  flex-direction: inherit;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 12px;
  @media screen and (min-width: ${breakpoints.medium}px) {
    margin-bottom: 8px;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const Title = styled.p`
  color: #333;
  font-weight: 700;
  margin: 0 0 0 16px;
  font-size: 24px;
  line-height: 27px;
  font-family: 'Times Modern';
  letter-spacing: 0em;
  @media (max-width: ${breakpoints.medium}px) {
    font-size: 18px;
    line-height: 20px;
  }
`;

export const Body = styled.p`
  color: #696969;
  font-weight: 400;
  margin: 0;
  font-size: 16px;
  line-height: 24px;
  font-family: 'Roboto';
  letter-spacing: 0em;
  @media (max-width: ${breakpoints.medium}px) {
    font-size: 14px;
    line-height: 21px;
  }
`;

export const CloseIconWrapper = styled.button`
  background: #fff;
  border: none;
  cursor: pointer;
`;

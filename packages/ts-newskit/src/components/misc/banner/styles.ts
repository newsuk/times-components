import { styled, Banner, TextBlock } from 'newskit';
import { breakpoints } from '@times-components/ts-styleguide';

export const BannerWrapper = styled.div`
  max-width: 498px;
  box-shadow: 0px 16px 24px 0px rgba(17, 17, 17, 0.08);
  z-index: 100;
  width: 100%;
`;

export const NewsKitBanner = styled(Banner)`
  border-top: 3px solid #005c8a;
  background-color: #fff;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  height: 83px;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const Title = styled(TextBlock)`
  color: #333;
  font-weight: 700;
  margin: 0 0 0 16px;
  font-size: 24px;
  line-height: 27px;
  @media (max-width: ${breakpoints.medium}px) {
    font-size: 18px;
    line-height: 20px;
  }
`;

export const Body = styled(TextBlock)`
  color: #696969;
  font-weight: 400;
  margin: 0;
  font-size: 16px;
  line-height: 24px;
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

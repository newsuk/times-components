import { styled, Banner } from 'newskit';
import { fonts } from 'newskit/cjs/theme/foundations/fonts';

export const BannerWrapper = styled.div`
  width: 100%;
  max-width: 498px;
  box-shadow: 0px 16px 24px 0px rgba(17, 17, 17, 0.08);
`;

export const NewsKitBanner = styled(Banner)`
  border-top: 3px solid #005c8a;
  background-color: #fff;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const Title = styled.h3`
  color: #333;
  font-family: ${fonts.fontSize040};
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 0 8px;
`;

export const Body = styled.p`
  color: #333;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  margin: 0;
`;

export const CloseIconWrapper = styled.button`
  background: #fff;
  border: none;
  cursor: pointer;
`;

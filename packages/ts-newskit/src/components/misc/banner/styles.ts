import { styled, Banner, TextBlock } from 'newskit';

export const BannerWrapper = styled.div`
  width: 100%;
  max-width: 498px;
  box-shadow: 0px 16px 24px 0px rgba(17, 17, 17, 0.08);
  z-index: 100;
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

export const Title = styled(TextBlock)`
  color: #333;
  font-weight: 700;
  margin: 0 0 0 16px;
`;

export const Body = styled(TextBlock)`
  color: #696969;
  font-weight: 400;
  margin: 0;
`;

export const CloseIconWrapper = styled.button`
  background: #fff;
  border: none;
  cursor: pointer;
`;

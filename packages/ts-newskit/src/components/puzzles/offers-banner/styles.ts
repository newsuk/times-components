import { Button, Block, styled } from 'newskit';
import { NewsKitOffersBannerBg } from '../../../assets';

export const Container = styled(Block)`
  width: 100%;
  height: 233px;
  position: relative;
`;

export const ViewOffersButton = styled(Button)`
  background-color: #005c8a;
  color: white;
  margin: 0 auto;
  display: block;
  width: 200px;
`;

export const Background = styled(NewsKitOffersBannerBg)`
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

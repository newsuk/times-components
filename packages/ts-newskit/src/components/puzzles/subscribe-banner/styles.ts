import {
  Stack,
  styled,
  getColorCssFromTheme,
  getMediaQueryFromTheme,
  StackProps,
  Block,
} from 'newskit';

import {
  NewsKitIconSubscribe3,
  NewsKitIconSubscribeB,
  NewsKitIconSubscribeQuestion,
} from '../../../assets';

export const SubscribeBannerContainer = styled(Stack)<StackProps>`
  overflow: hidden;
  ${getColorCssFromTheme('backgroundColor', 'sectionBrand040')};
  text-align: center;
  display: flex;
  justify-content: center;
  position: relative;
`;

export const StyledBlock = styled(Block)`
  position: relative;
  ${getMediaQueryFromTheme('md')} {
    width: 604px;
  }
  ${getMediaQueryFromTheme('lg')} {
    width: 838px;
  }
  ${getMediaQueryFromTheme('xl')} {
    width: 1058px;
  }
`;

export const StyledIconSubscribe3 = styled(NewsKitIconSubscribe3)`
  ${getMediaQueryFromTheme('xs')} {
    display: none;
  }
  ${getMediaQueryFromTheme('md')} {
    display: flex;
    position: absolute;
    top: 0;
    left: calc(50% - 378px - (58px / 2));
  }
`;

export const StyledIconSubscribeB = styled(NewsKitIconSubscribeB)`
  position: absolute;
  ${getMediaQueryFromTheme('xs')} {
    display: none;
  }
  ${getMediaQueryFromTheme('md')} {
    display: flex;
    right: calc(50% - 568px);
    top: 0;
    width: 107px;
    height: 63px;
  }
`;

export const StyledIconSubscribeQuestion = styled(NewsKitIconSubscribeQuestion)`
  position: absolute;
  ${getMediaQueryFromTheme('xs')} {
    display: none;
  }
  ${getMediaQueryFromTheme('md')} {
    display: flex;
    right: calc(50% - 391px);
    bottom: 0;
    width: 107px;
    height: 63px;
  }
`;

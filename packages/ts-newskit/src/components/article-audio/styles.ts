import {
  Block,
  getColorCssFromTheme,
  getSizingCssFromTheme,
  getSpacingCssFromTheme,
  styled,
  TextBlock,
  keyframes,
  IconButton,
  Stack,
  getShadowCssFromTheme,
  getBorderCssFromTheme,
  getMediaQueryFromTheme
} from 'newskit';

const setBlockPadding = (space: string) => ({ paddingBlock: `${space}` });
const setInlinePadding = (space: string) => ({ paddingInline: `${space}` });
const setWidth = (size: string) => ({ width: `${size}` });
const setTopBorderRadius = (radius: string) => ({
  borderTopLeftRadius: `${radius}`,
  borderTopRightRadius: `${radius}`
});

const scrollText = keyframes`
  to {
    transform: translateX(-50%);
  }
`;

export const StickyAudioPlayerContainer = styled(Block)`
  border-top: 1px solid;
  ${getColorCssFromTheme('background', 'inkInverse')};
  ${getColorCssFromTheme('borderTopColor', 'interface040')};
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  ${getSpacingCssFromTheme(setBlockPadding, 'space010')};
  ${getSpacingCssFromTheme(setInlinePadding, 'space040')};

  ${getMediaQueryFromTheme('md')} {
    ${getSpacingCssFromTheme(setBlockPadding, 'space040')};
    ${getSpacingCssFromTheme(setInlinePadding, 'space045')};
  }
`;

export const StickyAudioPlayer = styled(Block)`
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
`;

export const AudioPlayerContainer = styled(Block)`
  width: 100%;
`;

export const ButtonContainer = styled(Block)`
  ${getSizingCssFromTheme(setWidth, 'space080')};
`;

export const ScrollTextContainer = styled(Block)`
  display: flex;
  align-items: center;
  flex-grow: 1;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  ${getSpacingCssFromTheme(setBlockPadding, 'space020')};
`;
export const ScrollText = styled(Block)`
  cursor: pointer;
  display: flex;
  flex-wrap: nowrap;
  animation: ${scrollText} 5s infinite linear;
  width: 600px;
`;
export const ScrollTextItem = styled(TextBlock)`
  display: inline-block;
`;

export const AudioSeekBarContainer = styled(Block)`
  max-width: 505px;
  width: 100%;
`;

export const ExpandedContainer = styled(Stack)`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
  background: white;
  width: 100%;
  height: auto;
  border-top: 1px solid;
  ${getColorCssFromTheme('borderTopColor', 'interface040')};
  ${getBorderCssFromTheme(setTopBorderRadius, 'borderRadiusDefault')};
  ${getShadowCssFromTheme('boxShadow', 'shadow040')};
  ${getSpacingCssFromTheme(setBlockPadding, 'space040')};
  ${getSpacingCssFromTheme(setInlinePadding, 'space040')};
`;
export const CollapseButton = styled(IconButton)`
  display: block;
  margin-inline: auto;
`;
export const FullWidthRow = styled(Stack)`
  width: 100%;
  ${getSpacingCssFromTheme(setBlockPadding, 'space030')};
`;
export const EmptyBlock = styled(Block)`
  ${getSpacingCssFromTheme(setWidth, 'space090')};
`;

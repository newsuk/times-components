import {
  Stack,
  styled,
  getColorCssFromTheme,
  getMediaQueryFromTheme,
  getSpacingCssFromTheme,
  StackProps,
  Block,
  Divider,
  TextBlock,
  UnorderedList
} from 'newskit';

export const SyledUnorderedList = styled(UnorderedList)`
  & a {
    color: inherit;
    font-weight: 600;
  }
`;

export const StyledDivider = styled(Divider)`
  border-style: dashed;
  border-color: black;
`;

export const StyledTextBlock = styled(TextBlock)`
  & a {
    color: inherit;
    font-weight: 600;
  }

  ${getMediaQueryFromTheme('xs', 'md')} {
    align-self: center;
  }
`;

export const HeroBannerContainer = styled(Stack)<StackProps>`
  position: relative;
  width: 100%;
  overflow: hidden;
  ${getColorCssFromTheme('backgroundColor', 'puzzles040')};
  ${getMediaQueryFromTheme('xs')} {
    ${getSpacingCssFromTheme('paddingBlockStart', 'space100')};
    ${getSpacingCssFromTheme('paddingInline', 'space050')};
  }
  ${getMediaQueryFromTheme('sm')} {
    ${getSpacingCssFromTheme('paddingBlockStart', 'space100')};
    ${getSpacingCssFromTheme('paddingInline', 'space090')};
  }
`;

export const StyledStack = styled(Stack)`
  width: 100%;
  ${getColorCssFromTheme('backgroundColor', 'puzzles040')};
`;

export const StyledWrapper = styled(Block)`
  ${getMediaQueryFromTheme('lg')} {
    padding-right: 270px;
  }
`;

export const StyledCrosswordIconWrapper = styled(Block)`
  ${getMediaQueryFromTheme('xs', 'md')} {
    display: none;
  }
`;

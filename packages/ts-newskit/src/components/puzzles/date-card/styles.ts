import {
  styled,
  getColorCssFromTheme,
  Label,
  Block,
  getMediaQueryFromTheme,
  getSpacingCssFromTheme,
  getSizingCssFromTheme
} from 'newskit';

export const Container = styled(Block)`
  border: 1px solid;
  border-radius: 6px;
  background-color: #f9f9f9;
  ${getColorCssFromTheme('borderColor', 'interface050')};
  height: 138px;
  ${getMediaQueryFromTheme('xs')} {
    width: 110px;
  }
  ${getMediaQueryFromTheme('lg')} {
    width: 111.25px;
  }
  ${getMediaQueryFromTheme('xl')} {
    width: 148.75px;
  }
`;

export const StyledLabel = styled(Label)<{
  sectionColour?: string;
  hasGameLevel?: boolean;
}>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 5px 5px 0 0;
  text-transform: uppercase;
  ${getSpacingCssFromTheme('paddingBlock', 'space010')};
  ${getSpacingCssFromTheme('paddingInline', 'space010')};
  ${getSizingCssFromTheme('height', 'sizing050')};
  ${getSpacingCssFromTheme('marginInlineEnd', 'space000')};
  color: #f9f9f9;
  ${({ hasGameLevel, sectionColour }) =>
    hasGameLevel
      ? sectionColour
        ? getColorCssFromTheme('backgroundColor', sectionColour)
        : getColorCssFromTheme('backgroundColor', 'inkBase')
      : 'none'};
`;

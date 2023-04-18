import { styled, getColorCssFromTheme, Label, getMediaQueryFromTheme, getSpacingCssFromTheme, getSizingCssFromTheme } from 'newskit';

export const Container = styled.div`
  border: 1px solid;
  border-radius: 6px;
  ${getColorCssFromTheme('backgroundColor', '#F9F9F9')};
  ${getColorCssFromTheme('borderColor', 'interface050')};
  ${getSizingCssFromTheme('height', '138px')};
  ${getSizingCssFromTheme('width', '110px')};
  ${getMediaQueryFromTheme('xs')} {
    ${getSizingCssFromTheme('width', '110px')};
  }
  ${getMediaQueryFromTheme('sm')} {
    ${getSizingCssFromTheme('width', '110px')};
  }
  ${getMediaQueryFromTheme('lg')} {
    ${getSizingCssFromTheme('width', '111.25px')};
  }
  ${getMediaQueryFromTheme('xl')} {
    ${getSizingCssFromTheme('width', '148.75px')};
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
  line-height: 18px;
  text-transform: uppercase;
  ${getSpacingCssFromTheme('paddingBlock', 'space010')};
  ${getSpacingCssFromTheme('paddingInline', 'space010')};
  ${getSizingCssFromTheme('height', 'sizing050')};
  ${getSpacingCssFromTheme('marginInlineEnd', 'space000')};
  ${getColorCssFromTheme('color', '#F9F9F9')};
  ${({ hasGameLevel, sectionColour }) =>
    hasGameLevel
      ? sectionColour
        ? getColorCssFromTheme('backgroundColor', sectionColour)
        : getColorCssFromTheme('backgroundColor', 'inkBase')
      : 'none'};
`;

import {
  Divider,
  getMediaQueryFromTheme,
  getSpacingCssFromTheme,
  styled,
  Stack,
  Block,
  Scroll
} from 'newskit';

const setDividerPositionLeft = (space: string) => ({ left: `-${space}` });
const setDividerPositionRight = (space: string) => ({ right: `-${space}` });
export const LeadStoryDivider = styled(Divider)<{ position: string }>`
  position: absolute;
  top: 0;
  ${({ position }) =>
    getSpacingCssFromTheme(
      position === 'left' ? setDividerPositionLeft : setDividerPositionRight,
      'space040'
    )};
`;

export const AvatarDivider = styled(Divider)`
  ${getMediaQueryFromTheme('md')} {
    height: 100%;
  }
`;

export const StyledDivider = styled(Divider)`
  height: auto;
`;

export const StackItem = styled(Stack)<{
  $width?: { xs?: string; sm?: string; md?: string; lg?: string; xl?: string };
}>`
  margin: 0;
  position: relative;
  width: ${({ $width }) => ($width && $width.xs) || '100%'};

  ${getMediaQueryFromTheme('sm')} {
    ${({ $width }) => $width && $width.sm && `max-width: ${$width.sm};`}
  ${getMediaQueryFromTheme('md')} {
    ${({ $width }) => $width && $width.md && `max-width: ${$width.md};`}
  ${getMediaQueryFromTheme('lg')} {
    ${({ $width }) => $width && $width.lg && `max-width: ${$width.lg};`}
  ${getMediaQueryFromTheme('xl')} {
    ${({ $width }) => $width && $width.xl && `max-width: ${$width.xl};`}
`;

export const BlockItem = styled(Block)<{
  $width?: { xs?: string; sm?: string; md?: string; lg?: string; xl?: string };
}>`
  width: 100%;
  margin-inline: auto;

  ${getMediaQueryFromTheme('sm')} {
    ${({ $width }) => $width && $width.sm && `max-width: ${$width.sm};`}
  ${getMediaQueryFromTheme('md')} {
    ${({ $width }) => $width && $width.md && `max-width: ${$width.md};`}
  ${getMediaQueryFromTheme('lg')} {
    ${({ $width }) => $width && $width.lg && `max-width: ${$width.lg};`}
  ${getMediaQueryFromTheme('xl')} {
    ${({ $width }) => $width && $width.xl && `max-width: ${$width.xl};`}
`;

export const RelativeBlockItem = styled(Block)`
  position: relative;
`;

export const ScrollContainer = styled(Scroll)`
  overflow-y: hidden;
`;

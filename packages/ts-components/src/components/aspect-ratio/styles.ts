import styled, { css } from 'styled-components';

const ratioToPadding = new Map<string, string>([
  ['2:3', '150%'],
  ['4:5', '125%'],
  ['1:1', '100%'],
  ['4:3', '75%'],
  ['3:2', '66.66%'],
  ['16:9', '56.25%']
]);

export const AspectRatioContainer = styled.div<{ ratio?: string }>`
  ${({ ratio }) =>
    ratio &&
    ratioToPadding.has(ratio) &&
    css`
      position: relative;
      overflow: hidden;

      &:after {
        content: '';
        display: block;
        padding-bottom: ${ratioToPadding.get(ratio)};
      }

      > img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    `};
`;

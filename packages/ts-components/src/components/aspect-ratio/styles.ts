import styled, { css } from 'styled-components';

import { AspectRatios } from '../../types/aspectRatio';
import { ratioToPadding } from '../../utils/aspectRatio';

export const AspectRatioContainer = styled.div<{ ratio?: AspectRatios }>`
  ${({ ratio }) =>
    ratio &&
    ratioToPadding[ratio] &&
    css`
      position: relative;
      overflow: hidden;

      &:after {
        content: '';
        display: block;
        padding-bottom: ${ratioToPadding[ratio]};
      }

      > img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    `};
`;

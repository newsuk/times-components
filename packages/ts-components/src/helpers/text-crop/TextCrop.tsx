import styled from 'styled-components';
import React, { FC } from 'react';
import { FontTextCropSettings } from './fonts';

type TextCropAdjustments = {
  lineHeight?: number;
  topAdjustment?: string;
  bottomAdjustment?: string;
};

type TextCropProps = { font: FontTextCropSettings } & TextCropAdjustments;

const dynamicTopCrop = ({
  lineHeight = 1,
  font: { topCrop, cropLineHeight, cropFontSize }
}: TextCropProps) =>
  Math.max(topCrop + (lineHeight - cropLineHeight) * (cropFontSize / 2), 0) /
  cropFontSize;

const dynamicBottomCrop = ({
  lineHeight = 1,
  font: { bottomCrop, cropLineHeight, cropFontSize }
}: TextCropProps) =>
  Math.max(bottomCrop + (lineHeight - cropLineHeight) * (cropFontSize / 2), 0) /
  cropFontSize;

const Wrapper = styled.div<TextCropProps>`
  background-color: #ffb;
  padding:0;
  font-family: ${({ font }) => font.font};
  line-height: ${({ lineHeight }) => lineHeight};
  &::before,
  &::after {
    content: '';
    display: block;
    height: 0;
    width: 0;
  }

  &::before {
    /* prettier-ignore */
    margin-bottom: calc(${props => 0 - dynamicTopCrop(props)}em +
        ${({ topAdjustment }) => topAdjustment}
    );
  }

  &::after {
    /* prettier-ignore */
    margin-top: calc(${props => 0 - dynamicBottomCrop(props)}em +
        ${({ bottomAdjustment }) => bottomAdjustment}
    );
  }
`;

export const TextCrop: FC<TextCropProps> = ({
  children,
  lineHeight,
  bottomAdjustment = '0px',
  topAdjustment = '0px',
  font
}) => (
  <Wrapper
    lineHeight={lineHeight}
    bottomAdjustment={bottomAdjustment}
    topAdjustment={topAdjustment}
    font={font}
  >
    {children}
  </Wrapper>
);

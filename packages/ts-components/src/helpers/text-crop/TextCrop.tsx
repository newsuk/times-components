import styled from 'styled-components';
import React, { FC } from 'react';
import { Font, FontTextCropSettings, getFontCropSettings } from './fonts';

type TextCropAdjustments = {
  lineHeight?: number;
  topAdjustment?: string;
  bottomAdjustment?: string;
};

type TextCropStyleProps = {
  fontSettings: FontTextCropSettings;
} & TextCropAdjustments;
type TextCropProps = { font: Font } & TextCropAdjustments;

const dynamicTopCrop = ({
  lineHeight = 1,
  fontSettings: { topCrop, cropLineHeight, cropFontSize }
}: TextCropStyleProps) =>
  Math.max(topCrop + (lineHeight - cropLineHeight) * (cropFontSize / 2), 0) /
  cropFontSize;

const dynamicBottomCrop = ({
  lineHeight = 1,
  fontSettings: { bottomCrop, cropLineHeight, cropFontSize }
}: TextCropStyleProps) =>
  Math.max(bottomCrop + (lineHeight - cropLineHeight) * (cropFontSize / 2), 0) /
  cropFontSize;

const Wrapper = styled.div<TextCropStyleProps>`
  background-color: #ffb;
  padding:0;
  font-family: ${({ fontSettings }) => fontSettings.font};
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
    fontSettings={getFontCropSettings(font)}
  >
    {children}
  </Wrapper>
);

import styled, { keyframes } from 'styled-components';
import { fonts } from '@times-components/ts-styleguide';
import { FlagType } from './ArticleFlag';
import { gqlRgbaToStyle } from '@times-components/utils';

export const LiveArticleFlagContainer = styled.div`
  background-color: #9f0000;
  height: 24px;
  padding: 7px 7px 7px 9px;
  display: flex;
  flex-direction: row;
  width: fit-content;
`;

export const LiveArticleFlagText = styled.span`
  font-family: ${fonts.supporting};
  color: #ffffff;
  font-weight: 500;
  font-size: 12px;
  letter-spacing: 0.1em;
`;

const flashing = keyframes`
  0% {
    background-color: #ffffff;
  }

  50% {
   background-color: #9f0000;
  }

  100% {
    background-color: #ffffff;
  }`;

export const LiveArticleFlagIconContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  margin-right: 7px;
`;

export const LiveArticleFlagIcon = styled.div`
  height: 6px;
  width: 6px;
  animation: ${flashing} 2000ms infinite;
`;

export const ArticleFlagContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export const LiveFlagAndTimestampContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export const ArticleFlagBullet = styled.div`
  border-radius: 2.5px;
  height: 5px;
  width: 5px;
  background-color: ${({ color }) => gqlRgbaToStyle(color) || color};
`;

export const ArticleFlagTextContainer = styled.div`
  font-family: TimesDigitalW04-RegularSC;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.6px;
  line-height: 12px;
  margin-left: 5px;
  color: ${({ color }) => gqlRgbaToStyle(color) || color};
`;

export const FlagPadding = styled.div<{ allFlags: FlagType }>`
  margin-right: ${({ allFlags }) => (allFlags.length > 1 ? '15px' : 0)};
`;
export const Flags = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;
export const FlagsContainer = styled.div`
  margin-bottom: 15px;
  margin-top: 5px;
`;

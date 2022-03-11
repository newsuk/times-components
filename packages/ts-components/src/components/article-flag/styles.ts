import styled from 'styled-components';
import { fonts } from '@times-components/styleguide';
import { FlagType } from './ArticleFlag';
import { gqlRgbaToStyle } from '@times-components/utils';

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

export const LiveArticleFlagContainer = styled.div`
  display: flex;
  height: 24px;
  padding: 2px 7px 1px 9px;
  background-color: #9f0000;
  align-items: center;
`;

export const ArticleFlagBullet = styled.div`
  border-radius: 2.5px;
  height: 5px;
  width: 5px;
  background-color: ${({ color }) => gqlRgbaToStyle(color) || color};
`;

export const LiveIconContainer = styled.div`
  margin-right: 7px;
  color: #ffffff;
  font-size: 18px;
  align-self: self-end;
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

export const LiveArticleFlagText = styled.span`
  font-family: ${fonts.supporting};
  color: #ffffff;
  font-weight: 500;
  font-size: 12px;
  letter-spacing: 0.1em;
  line-height: 16px;
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

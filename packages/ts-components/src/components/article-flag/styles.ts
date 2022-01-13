import styled from 'styled-components';
import { fonts } from '@times-components/styleguide';
import { FlagType } from './ArticleFlag';
import { gqlRgbaToStyle } from '@times-components/utils';

// export const NewCombinedContainer = styled.div<{backgroundColor?: boolean}>`
//   display: flex;
//   align-items: ${({backgroundColor}) => backgroundColor ? 'baseline': 'center'};
//   flex-direction: row;
//   padding: ${({backgroundColor}) => backgroundColor ? '2px 6px': 0 };
//   background-color: ${({backgroundColor}) => backgroundColor ? '#9f0000': null };
// `;

export const ArticleFlagContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export const LiveArticleFlagContainer = styled.div`
  display: flex;
  padding: 2px 6px;
  background-color: #9f0000;
  align-items: baseline;
`;

// export const NewCombinedIconContainer = styled.div<{backgroundColor?: boolean, child?: string}>`
//   border-radius: ${({backgroundColor}) => !backgroundColor ? '2.5px': null};
//   height: ${({backgroundColor}) => !backgroundColor ? '5px': null};
//   width: ${({backgroundColor}) => !backgroundColor ? '5px': null};
//   background-color: ${({backgroundColor, color}) => !backgroundColor ?gqlRgbaToStyle(color) || color: null }; 
//   margin-right: ${({backgroundColor}) => backgroundColor ? '4px': 0};
//   line-height: ${({backgroundColor}) => backgroundColor ? '16px': 0};
//   color: ${({backgroundColor}) => backgroundColor ? '#ffffff': null};
// `;

export const ArticleFlagBullet = styled.div<{backgroundColor?: boolean, child?: string}>`
  border-radius: 2.5px;
  height: 5px;
  width: 5px;
  background-color: ${({color}) => gqlRgbaToStyle(color) || color};
  margin-right: ${({backgroundColor}) => backgroundColor ? '4px': 0};
  line-height: ${({backgroundColor}) => backgroundColor ? '16px': 0};
`;

export const LiveDiamondContainer = styled.div`
  margin-right: 4px;
  color: #ffffff;
  line-height: 16px;
`;

// export const NewCombinedTextContainer = styled.div<{backgroundColor?: boolean}>`
//   font-family: ${({backgroundColor}) => backgroundColor ? fonts.supporting : 'TimesDigitalW04-RegularSC'};
//   font-size: 12px;
//   font-weight: 400;
//   letter-spacing: 0.6px;
//   line-height: 12px;
//   margin-left: 5px;
//   color: ${({color}) => gqlRgbaToStyle(color) || color};
// `

export const ArticleFlagTextContainer = styled.div`
  font-family: TimesDigitalW04-RegularSC;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.6px;
  line-height: 12px;
  margin-left: 5px;
  color: ${({color}) => gqlRgbaToStyle(color) || color};
`
export const LiveArticleFlagTextContainer = styled.div`
  font-family: ${fonts.supporting};
  color: #ffffff;
  font-weight: 500;
  font-size: 12px;
  letter-spacing: 0.1em;
  line-height: 16px;
`;

export const FlagPadding = styled.div<{allFlags: FlagType[]}>`
  margin-right: ${({allFlags}) => allFlags.length > 1 ? "15px" : 0 };
`
export const Flags = styled.div`
  display: flex;    
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 10px;
`
export const FlagsContainer = styled.div`
  margin-bottom: 15px;
  margin-top: 5px;
`


import styled, { css } from 'styled-components';
import { breakpoints, colours, fonts } from '@times-components/ts-styleguide';

export const Container = styled.div<{ isBreaking: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 48px 10px 24px 10px;
  padding-top: ${({ isBreaking }) => (isBreaking ? '8px' : '5px')};
  border-top: 2px solid #9f0000;

  @media (min-width: ${breakpoints.medium}px) {
    width: 80.8%;
    margin: 64px 0 24px 10%;
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
    margin: 64px 0 24px 22%;
  }
`;

export const UpdatesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const TimeSincePublishingContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const TimeSincePublishing = styled.div`
  color: ${colours.functional.brandColour};
  font-family: ${fonts.supporting};
  font-size: 14px;
  line-height: 18px;
`;

const updatedStyle = css`
  color: ${colours.functional.secondary};
  font-family: ${fonts.supporting};
  font-size: 14px;
  line-height: 18px;
`;

export const UpdatedTimeItems = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export const UpdatedTime = styled.div<{ isLessThan13Hours?: boolean }>`
  ${updatedStyle};
`;

export const UpdatedDate = styled.div`
  ${updatedStyle} justify-content: end;
  padding: 0 4px 0 0;
`;

export const Divider = styled.div`
  background-color: ${colours.functional.greyLabel};
  width: 1px;
  margin: 2px 8px 6px 8px;
`;

export const Headline = styled.h2`
  color: ${colours.functional.brandColour};
  font-family: ${fonts.headline};
  font-size: 28px;
  line-height: 28px;
  margin-top: 22px;
  margin-bottom: 0px;
  font-weight: 400;

  @media (min-width: ${breakpoints.medium}px) {
    font-size: 36px;
    line-height: 36px;
    margin-top: 20px;
    margin-bottom: 0px;
  }
`;

export const FlagContainer = styled.div`
  margin-right: 8px;
`;

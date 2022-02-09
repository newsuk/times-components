import styled, { css } from 'styled-components';
import  { breakpoints, colours, fonts } from '@times-components/styleguide';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 48px auto 20px auto;
    padding-top: 8px;
    border-top: 2px solid #9F0000;

    @media (min-width: ${breakpoints.medium}px) {
        flex-direction: row;
        width: 80.8%;
        margin-top: 64px;
    }

    @media (min-width: ${breakpoints.wide}px) {
        width: 56.2%;
    }
`;

export const UpdatesContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const TimeSincePublishing = styled.div`
    color: ${colours.functional.brandColour};
    font-family: ${fonts.supporting};
    font-size: 14px;
    line-height: 18px;
    padding: 0 12px 0 8px;
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

export const UpdatedTime = styled.div`
    ${updatedStyle}
    padding: 0 0 0 8px;
`;

export const UpdatedDate = styled.div`
    ${updatedStyle}
    justify-content: end;
    padding: 0 4px 0 0;
`;

export const Divider = styled.div`
    color: ${colours.functional.greyLabel};
    font-size: 14px;
    line-height: 18px;
    
`;

export const Headline = styled.h2`
    color: ${colours.functional.brandColour};
    font-family: ${fonts.headline};
    font-size: 28px;
    line-height: 28px;

    @media (min-width: ${breakpoints.medium}px) {
        font-size: 36px;
        line-height: 36px;
    }
`;
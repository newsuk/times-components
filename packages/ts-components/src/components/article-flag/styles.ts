import styled from 'styled-components';
import { fonts } from '@times-components/styleguide';

export const Container = styled.div`
    display: flex;
    background-color: '#9f0000';
`;

export const BulletContainer = styled.div`
    margin: 2px 0 6px 8px;
`;

export const ContentContainer = styled.div`
    margin: 6px 8px 6px 5px;
`;

export const Title = styled.div`
    font-family: ${fonts.supporting};
    font-weight: 500;
    font-size: 12px;
    letter-spacing: 0.1em;
    line-height: 16px;
`;
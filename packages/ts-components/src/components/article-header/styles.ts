import styled from 'styled-components';
import  { breakpoints } from '@times-components/styleguide';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto 20px auto;
    padding: 20px;
    border-top: 2px solid #9F0000;

    @media (min-width: ${breakpoints.medium}px) {
        flex-direction: row;
        width: 80.8%;
    }

    @media (min-width: ${breakpoints.wide}px) {
        width: 56.2%;
    }
`
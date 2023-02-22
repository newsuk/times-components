import styled from "styled-components";

export const MainHeader = styled.header`
    left: 0;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    @media (min-width: 520px) {
        max-width: 520px;
        margin-left: auto;
        margin-right: auto;
    }
    @media (min-width: 768px) {
        margin-top: 0;
        width: 100%;
        position: relative;
        z-index: 3;
        margin-left: 0;
        margin-right: 0;
        max-width: 860px;
    }
    @media (min-width: 1024px) {
        max-width: 1024px;
        margin-left: auto;
        margin-right: auto;
    }
    @media (min-width: 1320px) {
        max-width: 1182px;
        margin-left: auto;
        margin-right: auto;
    }
`;

export const Masthead = styled.div`
    width: 100%;
    border-bottom: 1px solid #DBDBDB;
    display: none;
    @media (min-width: 768px) {
        text-align: center;
        display: block;
    }
`;

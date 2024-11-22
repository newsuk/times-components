import styled from 'styled-components';
import { fonts } from '@times-components/ts-styleguide';

export const FeaturesCarouselContainer = styled.div`
  position: relative;
  width: 100%;
  scrollbar-width: none;
  overflow: hidden;
  overflow-x: auto;
`;

export const FeaturesCarouselWindow = styled.div`
  position: relative;
  width: max-content;
  min-width: 100%;
  display: grid;
  grid-template-columns: 200px 200px 200px;
  grid-auto-rows: 1fr;
  grid-gap: 16px;
  padding-left: 10px;
  padding-right: 10px;
`;

export const CarouselItem = styled.a`
  border: 1px solid #e4e4e4;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  float: left;
  text-align: center;
  text-decoration: none;

  img {
    height: 80px;
    width: auto;
    margin: 8px auto;
  }
`;

export const CarouselContent = styled.div<{
  colours: {
    bg: string;
    title: string;
  };
}>`
  background: ${({ colours }) => colours.bg};
  flex-grow: 1;
  padding: 0 16px;
  width: 100%;

  h3 {
    color: ${({ colours }) => colours.title};
    font-family: 'Roboto';
    font-size: 12px;
    font-weight: 700;
    line-height: 14px;
    margin: 8px;
    text-transform: uppercase;
  }

  p {
    color: #000;
    font-family: 'Times Modern';
    font-size: 20px;
    font-weight: 300;
    line-height: 23px;
    margin: 8px;
  }
`;

export const Header = styled.div`
  margin-bottom: 12px;
  padding: 16px 12px 12px 12px;
  font-family: ${fonts.headline};
  font-size: 24px;
  line-height: 24px;
  font-weight: normal;
  text-align: center;
  border-top: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
`;

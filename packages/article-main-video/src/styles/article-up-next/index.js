import styled from "styled-components";
import {
  breakpoints,
} from "@times-components/ts-styleguide";
import { ArticleBodyContainer } from "../responsive";

export const UpNextContainer = styled(ArticleBodyContainer)`
  padding: 20px;
  position: relative;
  @media (min-width: ${breakpoints.medium}px) {
    padding: 24px;
  }
`;
export const UpNextScroll = styled.div`
  overflow-x: auto;
  position: relative;

  &::-webkit-scrollbar {
    display: none;
  }
  
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
export const UpNextTiles = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(156px, 1fr));
  grid-column-gap: 24px;
  
  @media (min-width: ${breakpoints.wide}px) {
    grid-template-columns: repeat(4, minmax(220px, 1fr));
  }
  @media (min-width: 1440px) {
    grid-template-columns: repeat(4, minmax(262px, 1fr));
  }
`;
export const UpNextTile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;

  & video {
    width: 100%;
  }

  &:not(:last-child)::after {
   content: '';
   position: absolute;
   background-color: #333;
   z-index: 1;
   height: 100%;
   width: 1px;
   right: -12px;
  }
`;
export const UpNextTileOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 75px;
  z-index: 1;
`;
export const UpNextTileOverlayRight = styled(UpNextTileOverlay)`
  background-image: linear-gradient(to left, #1D1D1B, transparent);
  display: ${({ $displayStatus }) => $displayStatus ? 'flex' : 'none'};
`;
export const UpNextTileOverlayLeft = styled(UpNextTileOverlay)`
  display: ${({ $displayStatus }) => $displayStatus ? 'flex' : 'none'};
  background-image: linear-gradient(to right, #1D1D1B, transparent);
  left: 0;
`;
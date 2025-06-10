import styled from "styled-components";
import { breakpoints } from "@times-components/ts-styleguide";
import { ArticleLabelText } from "../responsive";

export const ArticleUpNextContainer = styled.div`
  width: 100%;
  background-color: #1d1d1b;
  @media (min-width: ${breakpoints.wide}px) {
    background-color: unset;
    width: 220px;
    order: 0;
  }
`;
export const UpNextContainer = styled.div`
  position: relative;
  padding: 20px;
  @media (min-width: ${breakpoints.medium}px) {
    padding: 24px;
  }
  @media (min-width: ${breakpoints.wide}px) {
    padding: 0;
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
    grid-column-gap: 0;
    grid-row-gap: 24px;
    grid-template-columns: 1fr;
  }
`;
export const UpNextTile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  & * {
    max-width: 100%;
  }
  &:not(:last-child)::after {
    content: "";
    position: absolute;
    background-color: #333;
    z-index: 1;
    height: 100%;
    width: 1px;
    right: -12px;
  }
  @media (min-width: ${breakpoints.wide}px) {
    &:not(:last-child)::after {
      height: 1px;
      width: 100%;
      left: 0;
      bottom: -12px;
    }
  }
  &&& .vjs-big-play-button .vjs-icon-placeholder::before,
  .vjs-big-play-button .vjs-icon-placeholder::after {
    display: none !important;
  }
`;
export const ImageContainer = styled.div`
  position: relative;
  margin-bottom: 8px;
`;
export const ImageOverlay = styled.div`
  bottom: 0;
  position: absolute;
  width: 100%;
  height: 50%;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  z-index: 1;
`;
export const VideoDurationLabel = styled(ArticleLabelText)`
  bottom: 0;
  left: 10px;
  position: absolute;
`;
export const UpNextTileOverlay = styled.div`
  @media (max-width: 1023px) {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 75px;
    z-index: 1;
  }
`;
export const UpNextTileOverlayRight = styled(UpNextTileOverlay)`
  background-image: linear-gradient(to left, #1d1d1b, transparent);
  display: ${({ $displayStatus }) => ($displayStatus ? "flex" : "none")};
`;
export const UpNextTileOverlayLeft = styled(UpNextTileOverlay)`
  display: ${({ $displayStatus }) => ($displayStatus ? "flex" : "none")};
  background-image: linear-gradient(to right, #1d1d1b, transparent);
  left: 0;
`;

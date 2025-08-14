import styled from 'styled-components';
import { colours, breakpoints } from '@times-components/ts-styleguide';

export const StickyNoteBox = styled.div`
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: ${colours.functional.contrast};
  display: flex;
  flex-direction: column;
  position: absolute;
  max-width: calc(100vw - 20px);
  top: 100px;
  left: 0;
  z-index: 9999;

  @media (min-width: ${breakpoints.small}px) {
    width: calc(100vw - 20px);
  }
  @media (min-width: ${breakpoints.medium}px) {
    width: 300px;
  }
`;

export const StickyNoteHeader = styled.div`
  width: 100%;
  padding: 26px 24px;
  border-bottom: 1px solid #e4e4e4;
  display: felx;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px -20px 32px 0px rgba(17, 17, 17, 0.08);
`;

export const Title = styled.h3`
  font-family: Roboto;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  margin: 0;
`;

export const StickyNoteBody = styled.div`
  width: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Label = styled.div`
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #bf0000;
  font-family: Roboto;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 3%;
  color: #bf0000;
  text-transform: uppercase;
  justify-self: flex-start;
`;

export const Info = styled.p`
  font-family: Roboto;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #3b3b3b;
  margin-top: 12px;
  margin-bottom: 24;

  a {
    text-decoration: underline;
    color: #005c8a;
  }
`;

export const MoreLink = styled.a`
  font-family: Roboto;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-decoration: none;
  color: #005c8a;
`;

export const StickyNotePointer = styled.div`
  width: 22px;
  height: 22px;
  background-color: ${colours.functional.contrast};
  position: absolute;
  left: 10px;
  top: -11px;
  transform: rotate(45deg);
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

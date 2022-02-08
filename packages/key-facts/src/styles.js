import styled from "styled-components";
import { breakpoints, spacing, fonts, colours, fontSizes } from "@times-components/styleguide";

export const KeyFactTextLink = styled.a`
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
  &:active {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const BulletContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: ${spacing(4)};
  padding-left: ${spacing(1)};
  width: 100%;
`;

export const Bullet = styled.div`
  height: 6px;
  width: 6px;
  top: 2px;
  background-color: #9F0000;
`;  

export const KeyFactsTitle = styled.h2`
    font-family: ${fonts.headlineRegular};
    font-size: ${fontSizes.keyFactsTitle}px;
    font-weight: 700;
    letter-spacing: 1.2px;
    margin: 0px 0px 20px 0px;
    color: ${colours.functional.brandColour};
`;

export const Text = styled.span`
    color: ${colours.functional.primary};
    font-family: ${fonts.bodyRegular};
    font-size: ${fontSizes.infoSubText}px;
    margin-top: -8px;
    padding-left: ${spacing(3)};
    width: 95%;
`;

export const KeyFactsContainer = styled.div`
  padding: 20px 16px;
  background-color: ${colours.functional.backgroundPrimary};
  border-top: 2px solid #9F0000;
  @media (min-width: ${breakpoints.medium}px) {
    width: 80.8%;
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
  }
`;
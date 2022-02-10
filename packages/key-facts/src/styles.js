import styled from "styled-components";
import {
  breakpoints,
  spacing,
  fonts,
  colours,
  fontSizes
} from "@times-components/styleguide";

export const KeyFactTextLink = styled.a`
  cursor: pointer;
  text-decoration: underline;
  &:hover {
    color: ${colours.functional.brandColour};
  }
  &:active {
    color: ${colours.functional.brandColour};
  }
`;

export const BulletContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: ${spacing(4)};
  padding-left: ${spacing(1)};
  width: 100%;
  :last-of-type {
    margin-bottom: 0px;
  }
`;

export const Bullet = styled.div`
  height: 6px;
  width: 6px;
  margin-top: 2px;
  background-color: #9f0000;
`;

export const KeyFactsTitle = styled.h2`
  font-family: ${fonts.headline};
  font-size: ${fontSizes.keyFactsTitle}px;
  font-weight: 400;
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
  line-height: 28px;
`;

export const KeyFactsContainer = styled.div`
  margin: 0 auto 20px auto;
  padding: 16px 20px;
  background-color: ${colours.functional.backgroundPrimary};
  border-top: 2px solid #9f0000;
  @media (min-width: ${breakpoints.medium}px) {
    width: 80.8%;
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
  }
`;

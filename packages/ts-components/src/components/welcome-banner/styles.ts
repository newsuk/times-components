import styled from 'styled-components';
import { colours, fonts, breakpoints } from '@times-components/ts-styleguide';

export const WelcomeBannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-bottom: 16px;
  padding: 18px 16px;
  background-color: ${colours.functional.bannerBackground};
`;

export const Title = styled.div`
  color: ${colours.functional.greyText};
  font-family: ${fonts.headline};
  font-size: 40px;
  line-height: 45px;
  text-align: left;
  br.mobile {
    display: inline;
  }
  br.larger-breakpoints {
    display: none;
  }
  @media (min-width: ${breakpoints.medium}px) {
    text-align: center;
    br.mobile {
      display: none;
    }
    br.larger-breakpoints {
      display: inline;
    }
  }
`;

export const Text = styled.div`
  margin-top: 6px;
  color: ${colours.functional.primary};
  font-family: ${fonts.supporting};
  font-size: 18px;
  line-height: 27px;
  text-align: left;
  @media (min-width: ${breakpoints.medium}px) {
    text-align: center;
  }
`;

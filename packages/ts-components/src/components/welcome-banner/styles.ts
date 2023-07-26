import styled from 'styled-components';
import { colours, fonts } from '@times-components/ts-styleguide';

export const WelcomeBannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-bottom: 28px;
  padding: 21px 34px 20px;
  border: 1px solid ${colours.functional.primary};
`;

export const Title = styled.div`
  color: ${colours.functional.greyText};
  font-family: ${fonts.headline};
  font-size: 28px;
  line-height: 31px;
  text-align: center;
`;

export const Text = styled.div`
  padding-top: 8px;
  color: ${colours.functional.primary};
  font-family: ${fonts.supporting};
  font-size: 18px;
  text-align: center;
`;

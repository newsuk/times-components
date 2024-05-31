import styled from 'styled-components';
import { breakpoints, colours, fonts } from '@times-components/ts-styleguide';

const countries: Record<string, string> = {
  '119': 'Italy',
  '357': 'Germany',
  '115': 'Scotland',
  '538': 'Hungary',
  '497': 'Switzerland',
  '118': 'Spain',
  '535': 'Croatia',
  '534': 'Albania',
  '511': 'Poland',
  '366': 'Netherlands',
  '365': 'Slovenia',
  '369': 'Denmark',
  '364': 'Serbia',
  '114': 'England',
  '358': 'Romania',
  '510': 'Ukraine',
  '360': 'Belgium',
  '507': 'Slovakia',
  '515': 'Austria',
  '368': 'France',
  '362': 'Turkey',
  '520': 'Georgia',
  '359': 'Portugal',
  '367': 'CzechRep'
};

const flagStyles = Object.keys(countries).map(
  (countryCode: string) => `
  .Opta-Team-${countryCode} .Opta-Team, .Opta-Team-${countryCode}.Opta-Team  {
    background-image: url(https://nuk-tnl-editorial-prod-staticassets.s3.eu-west-1.amazonaws.com/opta/euro-flags/${
      countries[countryCode]
    }.svg);
    background-size: 20px;
    background-repeat: no-repeat;

    @media (max-width: ${breakpoints.small}px) {
      background-image: none;
      padding-left: 0 !important;
    }
  }
  .Opta-Team-${countryCode} .Opta-Team  {
    background-position: 0 13px;
    padding-left: 28px;
  }
  .Opta-Team-${countryCode}.Opta-Team  {
    background-position: 10px 8px;
    padding-left: 38px !important;
  }
`
);

export const Container = styled.div<{ border: boolean; fullWidth?: boolean }>`
  margin: 0 auto 20px auto;
  background-color: ${colours.functional.backgroundPrimary};
  border-top: ${({ border }) =>
    border ? `2px solid ${colours.section.sport}` : 'none'};

  a {
    text-decoration: none;
  }

  @media (min-width: ${breakpoints.medium}px) {
    flex-direction: row;
    width: ${({ fullWidth }) => (fullWidth ? '100%' : '80.8%')};
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: ${({ fullWidth }) => (fullWidth ? '100%' : '56.2%')};
  }
`;

export const PlaceholderContainer = styled.div<{ height?: number }>`
  position: relative;
  height: ${({ height }) => height || '200'}px;
`;

export const WidgetContainerBase = styled.div`
  &.team-flags {
    ${flagStyles};
  }

  .Opta {
    .Opta_W {
      margin: 0;
      background-color: transparent;

      h2 {
        height: auto;
        margin: 20px 0;
        color: ${colours.section.sport};
        font-family: ${fonts.supporting};
        font-size: 12px;
        line-height: 14px;
        font-weight: normal;
        letter-spacing: 1px;
        text-align: center;
        text-transform: uppercase;
        background-color: transparent;

        span {
          height: auto;
          font-size: 12px;
          line-height: 14px;
          font-weight: normal;
        }
      }

      table {
        width: 100%;
        margin: 0;
        border-collapse: collapse;
        border-spacing: 0;
      }
    }

    p {
      margin: 20px 0 0 0 !important;
      padding: 0 0 20px 0 !important;
      color: ${colours.functional.brandColour};
      font-family: ${fonts.supporting};
      font-size: 14px;
      line-height: 14px;
      text-align: center;
      background: transparent !important;
    }
  }
`;

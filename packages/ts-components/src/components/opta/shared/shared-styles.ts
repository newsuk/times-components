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
  .Opta-Team-${countryCode} .Opta-Team, .Opta-Team-${countryCode}.Opta-Team, .Opta-Player .Opta-Image-Team-${countryCode} {
    background-image: url(https://extras.thetimes.co.uk/web/opta/euro-flags/${
      countries[countryCode]
    }.svg);
    background-size: 20px;
    background-repeat: no-repeat;
  }
  .Opta-Team-${countryCode} .Opta-Team {
    background-position: 0 13px;
    padding-left: 28px !important;
    
    @media (max-width: ${breakpoints.small}px) {
      background-image: none;
      padding-left: 0 !important;
    }
  }
  .Opta-Team-${countryCode}.Opta-Team  {
    background-position: 10px 8px;
    padding-left: 38px !important;
  }
  .Opta-Scoreline .Opta-Team-${countryCode}.Opta-Team  {
    padding-left: 28px !important;

    @media (max-width: ${breakpoints.small}px) {
      background-image: none;
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
  }
  .Opta-Scoreline .Opta-Home.Opta-Team-${countryCode}.Opta-Team  {
    padding-left: 0 !important;
  }

  .Opta-Player .Opta-Image-Team-${countryCode} {
    width: 100%;
    display: block;
    height: 100%;
    background-position: 7px 3px;

    &.Opta-Image-Medium {
      background-size: 35px;
      background-position: 0 6px;
    }

    img {
      display: none;
    }
  }
`
);

export const Container = styled.div<{
  fullWidth?: boolean;
  heightSm?: number;
  heightMd?: number;
  heightLg?: number;
  hasPadding?: boolean;
}>`
  position: relative;
  ${({ heightSm }) => heightSm && `height: ${heightSm}px;`}
  margin: 0 auto 20px auto;
  padding-bottom: ${({ hasPadding }) => (hasPadding ? '20px' : '0')};
  background-color: ${colours.functional.backgroundPrimary};
  border-top: 2px solid ${colours.section.sport};
  a {
    text-decoration: none;
  }

  @media (min-width: ${breakpoints.medium}px) {
    flex-direction: row;
    ${({ heightMd }) => heightMd && `height: ${heightMd}px;`}
    width: ${({ fullWidth }) => (fullWidth ? '100%' : '80.8%')};
  }

  @media (min-width: ${breakpoints.wide}px) {
    ${({ heightLg }) => heightLg && `height: ${heightLg}px;`}
    width: ${({ fullWidth }) => (fullWidth ? '100%' : '56.2%')};
  }
`;

export const PlaceholderContainer = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  z-index: 1;
`;

export const WidgetContainerBase = styled.div`
  .Opta {
    &.team-flags {
      ${flagStyles};
    }

    .Opta_W {
      margin: 0;
      background-color: transparent;

      h2 {
        height: auto;
        margin: 20px 0 10px;
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

        &.Opta-MatchHeader {
          height: 75px;

          tbody {
            tr.Opta-MatchHeader-Details td > div,
            div.Opta-MatchHeader-Details > div {
              height: 18px;
              min-height: 18px;
            }

            tr.Opta-MatchHeader-Details td span {
              line-height: 18px;
            }

            th,
            td {
              height: 18px;
            }
          }
        }
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

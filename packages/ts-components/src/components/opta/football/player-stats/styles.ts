import styled from 'styled-components';
import { breakpoints, colours, fonts } from '@times-components/ts-styleguide';

import { WidgetContainerBase } from '../../shared/shared-styles';

export const WidgetContainer = styled(WidgetContainerBase)`
  .Opta {
    h2 {
      margin: 20px 0 10px 0 !important;
    }

    .Opta-Cf {
      padding: 0;
      background-color: transparent;

      table {
        tbody {
          tr {
            th.Opta-Stats-Bars-Text {
              height: auto;
              padding: 20px 0 0 0;
              color: ${colours.functional.brandColour};
              font-family: ${fonts.supporting};
              font-size: 13px;
              line-height: 14px;
            }

            td {
              height: auto;
              color: ${colours.functional.brandColour};
              font-family: ${fonts.headline};
              font-size: 18px;
              line-height: 18px;
              padding: 0;

              &.Opta-Crest {
                text-align: left;

                &.Opta-Home {
                  text-align: right;
                }

                img {
                  width: 40px;
                }
              }

              &.Opta-Team {
                padding-left: 10px;
                font-size: 18px;
                line-height: 18px;

                &.Opta-Home {
                  padding-right: 10px;
                  padding-left: 0;
                  text-align: right;
                }
              }

              &.Opta-Score {
                width: 20px;
                font-size: 24px;
                line-height: 24px;
                text-align: left;

                &.Opta-Home {
                  text-align: right;
                }

                span {
                  min-width: 0;
                  padding: 0;
                  color: inherit;
                  font-family: inherit;
                  font-size: inherit;
                  line-height: inherit;
                  text-align: inherit;
                  background-color: transparent !important;
                }

                @media (min-width: ${breakpoints.medium}px) {
                  width: 30px;
                  font-size: 32px;
                  line-height: 32px;
                }
              }

              &.Opta-Divider {
                width: 20px;
                text-align: center;

                abbr {
                  font-size: inherit;
                  line-height: inherit;
                  text-decoration: none;
                }
              }

              .Opta-Bars {
                margin: 0;

                .Opta-Percent.Opta-Home {
                  background-color: ${colours.section.sport};
                }

                .Opta-Percent.Opta-Away {
                  background-color: ${colours.section.sport};
                  opacity: 0.5;
                }
              }
            }

            &.Opta-Score-Extras {
              td {
                color: ${colours.functional.brandColour};
                font-family: ${fonts.supporting};
                font-size: 14px;
                line-height: 28px;

                span {
                  color: inherit;
                  font-size: inherit;
                }
              }
            }

            &.Opta-MatchHeader-Details {
              div {
                padding: 0;
                color: ${colours.section.sport};
                font-family: ${fonts.supporting};
                font-size: 12px;
                line-height: 12px;
                letter-spacing: 1px;
                text-transform: uppercase;
                background-color: transparent;

                span {
                  margin: 0 6px;
                  color: inherit;
                  font-size: inherit;
                }
              }
            }
          }
        }

        &.Opta-Stats-Bars {
          margin-bottom: 20px;
        }
      }
    }
  }
`;

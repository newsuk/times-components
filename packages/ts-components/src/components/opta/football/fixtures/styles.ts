import styled from 'styled-components';
import { breakpoints, colours, fonts } from '@times-components/styleguide';

import { WidgetContainerBase } from '../shared-styles';

export const WidgetContainer = styled(WidgetContainerBase)`
  .Opta {
    table {
      tbody {
        td.Opta-title {
          height: 40px;
          padding: 0;
          background-color: ${colours.functional.backgroundSecondary};

          h3 {
            height: auto;
            margin: 0 0 0 10px;
            color: ${colours.functional.primary};
            font-family: ${fonts.supporting};
            font-size: 14px;
            line-height: 14px;
            font-weight: normal;
            background-color: transparent;
            border-bottom: 0;

            span {
              height: auto;
              padding: 0;
              line-height: 14px;
            }

            @media (min-width: ${breakpoints.medium}px) {
              margin: 0 0 0 20px;
            }
          }
        }

        tr.Opta-Scoreline {
          height: 40px;
          background-color: transparent !important;
          border-bottom: 1px solid ${colours.functional.backgroundSecondary};

          @media (min-width: ${breakpoints.medium}px) {
            height: 50px;
          }

          td {
            max-width: none !important;
            padding: 3px 0 0 0;
            color: ${colours.functional.primary} !important;
            font-family: ${fonts.headline};
            font-size: 14px;
            line-height: 14px;
            background-color: transparent;

            &.Opta-Time {
              width: 50px !important;
              padding: 6px 0 0 10px;
              color: ${colours.section.sport} !important;
              font-family: ${fonts.supporting};

              abbr {
                font-size: inherit;
                line-height: inherit;
                text-decoration: none;
              }

              @media (min-width: ${breakpoints.medium}px) {
                width: 60px !important;
                padding: 6px 0 0 20px;
              }
            }

            &.Opta-Team {
              width: 30% !important;
              padding-left: 10px;

              &.Opta-Home {
                padding-right: 10px;
                text-align: right;
              }

              @media (min-width: ${breakpoints.medium}px) {
                padding-left: 15px;

                &.Opta-Home {
                  padding-right: 15px;
                }
              }
            }

            &.Opta-Score {
              width: 25px !important;
              font-size: 16px;
              line-height: 16px;
              text-align: left !important;

              &.Opta-Home {
                text-align: right !important;
              }

              span {
                font-size: inherit;
                line-height: inherit;
              }

              @media (min-width: ${breakpoints.medium}px) {
                width: 30px !important;
                font-size: 24px;
                line-height: 24px;
              }
            }

            &.Opta-Crest {
              width: 20px !important;
              height: 20px;
              margin-top: -3px;

              img {
                width: 20px;
              }
            }

            &.Opta-Divider {
              width: 20px !important;
              text-align: center;

              abbr {
                font-size: inherit;
                line-height: inherit;
                text-decoration: none;
              }
            }

            &.Opta-Outer:not(.Opta-Time) {
              width: 50px !important;
              padding: 0 10px 0 0;

              @media (min-width: ${breakpoints.medium}px) {
                width: 60px !important;
                padding: 0 20px 0 0;
              }
            }

            @media (min-width: ${breakpoints.medium}px) {
              font-size: 16px;
              line-height: 16px;
            }
          }
        }
      }

      tbody.Opta-prematch {
        tr.Opta-Scoreline {
          @media (min-width: ${breakpoints.medium}px) {
            height: 40px;
          }
        }
      }
    }
  }
`;

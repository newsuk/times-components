import styled from 'styled-components';
import { breakpoints, colours, fonts } from '@times-components/ts-styleguide';

import { WidgetContainerBase } from '../shared-styles';

export const WidgetContainerOverride = styled(WidgetContainerBase)`
  .Opta {
    h2 {
      margin: 20px 0 0 0 !important;
    }

    .Opta-js-main {
      table {
        tbody {
          td.Opta-title {
            background-color: transparent !important;
            border-bottom: 1px solid #e4e4e4;

            h3 {
              margin: 20px 0 0 0 !important;
              font-family: ${fonts.headline} !important;
              font-size: 16px !important;
              line-height: 30px !important;
              text-align: center;

              span {
                font-size: inherit;
              }

              @media (min-width: ${breakpoints.medium}px) {
                font-size: 18px !important;
                line-height: 40px !important;
              }
            }
          }
        }
      }
    }
  }
`;

export const WidgetContainer = styled(WidgetContainerBase)<{
  isNationalComp?: boolean;
  columns?: boolean;
}>`
  .Opta {
    .Opta-js-main {
      padding: 0;
      background-color: transparent;

      table {
        display: block;
        @media (min-width: ${breakpoints.medium}px) {
          ${({ columns }) => columns && 'column-count: 2;'};
        }

        tbody {
          display: block;
          break-inside: avoid;

          &:has(h3) {
            column-span: all;
            margin-top: 24px;
          }

          td.Opta-Nest.Opta-JS-Nest-Content.Opta-Expanded {
            display: inline;
          }

          td.Opta-title {
            display: block;
            background-color: ${colours.functional.backgroundSecondary};

            h3 {
              height: auto;
              margin: 0 0 0 10px;
              color: ${colours.functional.brandColour};
              font-family: ${fonts.supporting};
              font-size: 14px;
              line-height: 14px;
              font-weight: normal;
              background-color: transparent;
              border-bottom: 0;

              span {
                float: none;
                padding: 0;
                font-size: 13px;
              }

              @media (min-width: ${breakpoints.medium}px) {
                margin: 0 0 0 20px;
              }
            }
          }

          tr {
            display: block;
          }

          tr.Opta-Scoreline {
            height: 40px;
            background-color: transparent !important;
            border-bottom: 1px solid #e4e4e4;
            display: flex;
            justify-content: space-between;
            align-items: center;

            @media (min-width: ${breakpoints.medium}px) {
              height: 50px;
            }

            td {
              max-width: none !important;
              color: ${colours.functional.brandColour} !important;
              font-family: ${fonts.headline};
              font-size: 14px;
              line-height: 14px;
              height: unset;
              background-color: transparent;

              &.Opta-Time {
                padding-left: 10px;
                color: ${colours.section.sport} !important;
                font-family: ${fonts.supporting};

                abbr {
                  font-size: inherit;
                  line-height: inherit;
                  text-decoration: none;
                }

                @media (min-width: ${breakpoints.medium}px) {
                  font-size: 13px;
                  line-height: 14px;
                }
              }

              &.Opta-Team {
                background-position: center left;
                width: 34%;
                padding-left: ${({ isNationalComp }) =>
                    isNationalComp ? '38px;' : '10px;'}
                  &.Opta-Home {
                  background-position: center right;
                  padding-right: ${({ isNationalComp }) =>
                    isNationalComp ? '38px;' : '10px;'};
                  padding-left: 0;
                  text-align: right;
                }

                ${({ isNationalComp }) =>
                  !isNationalComp &&
                  `
                  @media (max-width: ${breakpoints.medium}px) {
                    padding-left: 15px;

                    &.Opta-Home {
                      padding-right: 15px;
                      padding-left: 0;
                    }
                  }
                `};
              }

              &.Opta-Score {
                font-size: 16px;
                line-height: 16px;
                text-align: center !important;
                min-width: 25px;

                span {
                  font-size: inherit;
                  line-height: inherit;
                }

                @media (min-width: ${breakpoints.medium}px) {
                  font-size: 24px;
                  line-height: 24px;
                }
              }

              &.Opta-Crest {
                img {
                  width: 20px;
                }
              }

              &.Opta-Divider {
                text-align: center;

                abbr {
                  font-size: inherit;
                  line-height: inherit;
                  text-decoration: none;
                }
              }

              &.Opta-Outer:not(.Opta-Time) {
                padding-right: 10px;
              }

              @media (min-width: ${breakpoints.medium}px) {
                font-size: 16px;
                line-height: 16px;
              }
            }
          }

          tr.Opta-agg {
            background-color: transparent !important;

            td {
              padding: 10px;
              color: ${colours.functional.primary};
              font-family: ${fonts.supporting};
              font-size: 13px;
              line-height: 16px;
              background-color: transparent;

              span {
                font-size: inherit;
                line-height: inherit;
              }

              span.Opta-agg-text {
                text-transform: uppercase;
              }
            }
          }

          tr {
            td.Opta-Nest {
              padding: 0;

              .Opta_W {
                > .Opta-Cf {
                  background-color: transparent;
                  border-bottom: 1px solid #e4e4e4;

                  .Opta-Events {
                    padding: 10px 0 2px 0;

                    li {
                      padding: 0 0 8px 0;

                      .Opta-Event-Text {
                        color: ${colours.functional.primary};
                        font-family: ${fonts.supporting};
                        font-size: 13px;
                        line-height: 16px;

                        .Opta-Event-Player,
                        .Opta-Event-Time {
                          font-size: inherit;
                          line-height: inherit;
                        }

                        .Opta-Event-Time {
                          color: ${colours.section.sport};
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

import styled from 'styled-components';
import { breakpoints, colours, fonts } from '@times-components/styleguide';

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

export const WidgetContainer = styled(WidgetContainerBase)`
  .Opta {
    .Opta-js-main {
      padding: 0;
      background-color: transparent;

      table {
        tbody {
          td.Opta-title {
            height: 40px;
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
              }

              @media (min-width: ${breakpoints.medium}px) {
                margin: 0 0 0 20px;
              }
            }
          }

          tr.Opta-Scoreline {
            height: 40px;
            background-color: transparent !important;
            border-bottom: 1px solid #e4e4e4;

            @media (min-width: ${breakpoints.medium}px) {
              height: 50px;
            }

            td {
              max-width: none !important;
              padding: 3px 0 0 0;
              color: ${colours.functional.brandColour} !important;
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
                  font-size: 14px;
                  line-height: 14px;
                }
              }

              &.Opta-Team {
                width: 30% !important;
                padding-left: 10px;

                &.Opta-Home {
                  padding-right: 10px;
                  padding-left: 0;
                  text-align: right;
                }

                @media (min-width: ${breakpoints.medium}px) {
                  padding-left: 15px;

                  &.Opta-Home {
                    padding-right: 15px;
                    padding-left: 0;
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

          tr.Opta-agg {
            background-color: transparent !important;

            td {
              padding: 10px;
              color: ${colours.functional.primary};
              font-family: ${fonts.supporting};
              font-size: 14px;
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
                        font-size: 14px;
                        line-height: 16px;

                        .Opta-Event-Player,
                        .Opta-Event-Time,
                        .Opta-Event-Text-Type {
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

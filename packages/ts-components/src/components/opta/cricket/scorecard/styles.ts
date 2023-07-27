import styled from 'styled-components';
import { colours, fonts } from '@times-components/ts-styleguide';

import { WidgetContainerBase } from '../shared-styles';

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
            td {
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
                  height: 40px;
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
            }

            &.Opta-MatchHeader-Details {
              div {
                margin: 6px 0;
                padding: 0;
                color: ${colours.section.sport};
                font-family: ${fonts.supporting};
                font-size: 12px;
                line-height: 12px;
                letter-spacing: 1px;
                text-transform: uppercase;
                background-color: transparent;

                dl {
                  margin: 0 6px 4px 6px;
                  color: inherit;
                  font-size: inherit;

                  :before {
                    display: none;
                  }

                  &:first-of-type,
                  &:last-of-type {
                    display: block;
                  }
                }
              }
            }
          }
        }
      }

      .Opta-CricketStateOfPlay {
        div {
          min-height: 0;
          margin: 0;
          padding: 10px;
          color: ${colours.functional.brandColour};
          font-family: ${fonts.headline};
          font-size: 18px;
          font-weight: normal;
          line-height: 18px;
          background-color: transparent;
        }
      }

      .Opta-scorecard {
        .Opta-Tabs {
          .Opta-Nav {
            background-color: transparent;

            ul {
              display: flex;
              background-color: transparent;

              li {
                width: 100%;

                a {
                  width: 100%;
                  color: ${colours.functional.brandColour};
                  font-family: ${fonts.supporting};
                  font-size: 14px;
                  font-weight: normal;
                  text-align: center;
                  background-color: #dbdbdb;

                  &:hover {
                    background-color: #ededed;
                  }
                }

                &.Opta-On a {
                  color: white;
                  background-color: #008347;
                }
              }
            }
          }
        }

        table.Opta-batting {
          margin-bottom: 10px;

          thead {
            th {
              width: 8%;
              padding: 0;
              color: ${colours.functional.primary};
              font-family: ${fonts.supporting};
              font-size: 12px;
              line-height: 14px;
              font-weight: normal;
              background-color: #ededed;

              &:first-of-type {
                width: 64%;
                padding-left: 5px;
              }

              &:nth-of-type(4),
              &:nth-of-type(5) {
                width: 6%;
              }
            }
          }

          tfoot {
            th {
              color: ${colours.functional.brandColour};
              font-family: ${fonts.supporting};
              font-size: 14px;
              line-height: 14px;
              font-weight: bold;
              background-color: #dbdbdb;

              &:first-of-type {
                padding-left: 5px;
              }

              &:last-of-type {
                padding-left: 0;
              }
            }
          }

          tbody {
            tr:nth-child(2n) th,
            tr:nth-child(2n) td {
              background-color: #ededed;
            }

            tr:last-of-type td {
              color: ${colours.functional.brandColour};
              font-family: ${fonts.supporting};
              font-size: 12px;
              line-height: 14px;
              font-weight: normal;
            }

            th {
              padding: 0;
              color: ${colours.functional.brandColour};
              font-family: ${fonts.supporting};
              font-size: 12px;
              line-height: 14px;
              font-weight: bold;
            }

            td {
              padding: 0;
              color: ${colours.section.sport};
              font-family: ${fonts.supporting};
              font-size: 12px;
              line-height: 14px;
              font-weight: normal;

              &:first-of-type,
              &:nth-of-type(2) {
                padding-left: 5px;
                color: ${colours.functional.brandColour};
                font-family: ${fonts.headline};
                font-size: 16px;
                font-weight: normal;
                line-height: 16px;
              }
            }
          }
        }

        table.Opta-bowling {
          width: calc(60% - 10px);
          float: left;

          thead {
            th {
              width: 12%;
              color: ${colours.functional.brandColour};
              font-family: ${fonts.supporting};
              font-size: 12px;
              line-height: 14px;
              font-weight: normal;
              text-align: center;
              background-color: #ededed;

              &:first-of-type {
                width: 40%;
                padding-left: 5px;
                text-align: left;
              }
            }
          }

          tbody {
            th {
              padding: 0;
              color: ${colours.functional.brandColour};
              font-family: ${fonts.supporting};
              font-size: 12px;
              line-height: 14px;
              font-weight: bold;
              text-align: center;
            }

            td {
              padding: 0;
              color: ${colours.section.sport};
              font-family: ${fonts.supporting};
              font-size: 12px;
              line-height: 14px;
              font-weight: normal;
              text-align: center;

              &:first-of-type {
                padding-left: 5px;
                color: ${colours.functional.brandColour};
                font-family: ${fonts.headline};
                font-size: 16px;
                font-weight: normal;
                line-height: 16px;
                text-align: left;
              }
            }
          }
        }

        .Opta-Ranking {
          table {
            width: calc(40%);
            float: right;

            thead {
              th {
                color: ${colours.functional.brandColour};
                font-family: ${fonts.supporting};
                font-size: 12px;
                line-height: 14px;
                font-weight: normal;
                text-align: center;
                background-color: #ededed;

                &:first-of-type {
                  padding-left: 5px;
                  text-align: left;
                }
              }
            }

            tbody {
              th {
                padding: 0;
                color: ${colours.functional.brandColour};
                font-family: ${fonts.supporting};
                font-size: 12px;
                line-height: 14px;
                font-weight: bold;
                text-align: center;
              }

              td {
                padding: 0;
                color: ${colours.section.sport};
                font-family: ${fonts.supporting};
                font-size: 12px;
                line-height: 14px;
                font-weight: normal;
                text-align: center;

                &:first-of-type {
                  padding-left: 5px;
                  color: ${colours.functional.brandColour};
                  font-family: ${fonts.headline};
                  font-size: 16px;
                  font-weight: normal;
                  line-height: 16px;
                  text-align: left;
                }
              }
            }
          }
        }
      }
    }
  }
`;

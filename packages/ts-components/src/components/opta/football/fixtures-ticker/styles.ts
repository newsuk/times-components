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
  isApp?: boolean;
  showButtons?: boolean;
}>`
  height: 80px !important;

  .Opta {
    font-family: Roboto !important;
  }

  .Opta-Scroll,
  .Opta-Window,
  .Opta-Room {
    height: 80px !important;
  }

  ${({ showButtons }) =>
    !showButtons &&
    `
    @media (max-width: ${breakpoints.small}px) {
      .Opta-Scroller {
        display: none !important;
      }
    }
  `}

  @media (max-width: ${breakpoints.small}px) {
    .Opta-Window {
      left: ${({ showButtons }) => (showButtons ? '30px' : '0')} !important;
      right: 0 !important;
      ${({ showButtons }) =>
        showButtons
          ? 'width: calc(100% - 60px) !important;'
          : `
        overflow-x: auto !important;
        position: relative !important;`}
    }
  }

  .fixtures-page-link.Opta-fixture {
    width: 85px !important;
    padding: 10px 8px;
    border: 1px solid black;
    background-color: transparent;
    a {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      flex-direction: column;
      height: 100%;
      span {
        color: black !important;
        font-size: 12px;
        font-weight: 700 !important;
        display: block;
      }
      svg {
        rect {
          font-weight: 700 !important;
        }
        stroke: black;
        fill: transparent;
        path {
          fill: black;
        }
      }
    }

    ${({ isApp }) =>
      isApp &&
      `
      @media (prefers-color-scheme: dark) {
        border: 1px solid white;

        a {
          span {
            color: white !important;
          }
          svg {
            stroke: white;
            path {
              fill: white;
            }
          }
        }
      }
    `};
  }

  .Opta-Cf.Opta-Scroll.Opta-Active {
    background-color: transparent !important;
  }

  .Opta-Scroller {
    background-color: white !important;
    border: 1px solid #999 !important;
    border-radius: 2px;
    box-sizing: border-box;
    padding: 39px 0 !important;
    width: 28px !important;

    &:hover {
      background-color: #f5f5f5 !important;
    }
    &:active {
      background-color: #eee !important;
    }

    &::after {
      background: rgba(0, 0, 0, 0)
        url(https://secure.widget.cloud.opta.net/v3/assets/images/sprites/controls.svg)
        no-repeat !important;
      background-size: 210px 186px !important;
      background-position-x: -180px !important;
      background-position-y: -19px !important;
      height: 16px !important;
      width: 16px !important;
      top: calc(50% - 8px) !important;
      left: calc(50% - 8px) !important;
    }

    &.Opta-Next::after {
      transform: rotate(-90deg) translateX(2px);
    }
    &.Opta-Previous::after {
      transform: rotate(90deg) translateX(2px);
    }

    @media (max-width: ${breakpoints.medium}px) {
      width: 18px !important;
    }
    @media (max-width: ${breakpoints.wide}px) {
      width: 24px !important;
    }
    ${({ isApp }) =>
      isApp &&
      `
      @media (prefers-color-scheme: dark) {
        background-color: black !important;
        border: 1px solid white !important;

        &:hover {
          background-color: #303030 !important;
        }
        &:active {
          background-color: #4f4f4f !important;
        }
        &::after {
          background-position-y: -57px !important;
        }
      }
    `};
  }

  .Opta-fixture {
    height: 80px;
    padding-inline: 4px;
    display: flex;
    flex-direction: column;

    > div {
      background-color: white !important;
    }

    .Opta-Team,
    .Opta-timings {
      border-right: 0 !important;
    }
    .Opta-Team {
      height: 24px !important;

      .team-flag {
        width: 20px;
        margin-bottom: -2px;
        margin-right: 8px;
      }
    }
    .Opta-timings {
      height: 24px !important;
      order: -1;
      color: #696969 !important;
      border-start-start-radius: 4px;
      border-start-end-radius: 4px;

      @media (prefers-color-scheme: dark) {
        color: #E4E4E4 !important;
      }
    }

    .Opta-timings .Opta-Time * {
      font-weight: 700;
      color: #01000d !important;

      @media (prefers-color-scheme: dark) {
        color: #FFF !important;
      }
    }

    .Opta-TeamName,
    .Opta-Team-Score {
      color: #01000d !important;
      font-family: 'Roboto-Medium' !important;

      @media (prefers-color-scheme: dark) {
        color: #FFF !important;
      }
    }

    .Opta-Away {
      border-end-start-radius: 4px;
      border-end-end-radius: 4px;
      height: 34px !important;
    }

    &.Opta-prematch {
      > div {
        background-color: #f5f5f5 !important;

        @media (prefers-color-scheme: dark) {
          background-color: #333 !important;
        }
      }
      .Opta-Team-Score::after {
        content: '-';
      }
      .Opta-timings .Opta-Time * {
        font-weight: 400;
        color: #696969 !important;
      }
    }

    &.Opta-result > div {
      border: 1px solid #ccc !important;

      @media (prefers-color-scheme: dark) {
        background-color: #1D1D1B !important;
        border: 1px solid #333 !important;
      }

      &.Opta-timings {
        border-bottom: none !important;
      }
      &.Opta-Home {
        border-bottom: none !important;
        border-top: none !important;
      }
      &.Opta-Away {
        border-top: none !important;
      }
    }
    &.Opta-live > div {
      border: 1px solid #01000d !important;

      @media (prefers-color-scheme: dark) {
        background-color: #121212 !important;
        border: 1px solid #E4E4E4 !important;
      }

      &.Opta-timings {
        border-bottom: none !important;
      }
      &.Opta-Home {
        border-bottom: none !important;
        border-top: none !important;
      }
      &.Opta-Away {
        border-top: none !important;
      }
    }

    .Opta-Image-Team-Small {
      height: 20px;
    }
  }

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
                font-size: 13px;
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
                  font-size: 13px;
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

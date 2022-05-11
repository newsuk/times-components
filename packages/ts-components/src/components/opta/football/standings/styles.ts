import styled from 'styled-components';
import { breakpoints, colours, fonts } from '@times-components/ts-styleguide';

import { WidgetContainerBase } from '../shared-styles';

export const WidgetContainer = styled(WidgetContainerBase)`
  .Opta {
    h3.Opta-groupname {
      height: 40px;
      margin: 0;
      padding-left: 10px;
      color: ${colours.functional.primary};
      font-family: ${fonts.supporting};
      font-size: 14px;
      line-height: 42px;
      font-weight: normal;
      background-color: ${colours.functional.keyline};
      border: 0;

      span {
        float: none;
        padding: 0;
      }

      @media (min-width: ${breakpoints.medium}px) {
        padding-left: 14px;
      }
    }

    .Opta-Cf {
      float: none;
      margin: 0;
      padding: 0;
      background-color: transparent;

      &.Opta-Dropdown {
        .Opta-Nav {
          width: 110px;
          margin: 20px auto;
          background-color: transparent;
          border: 1px solid ${colours.functional.brandColour};

          h3 {
            height: 38px;
            color: ${colours.functional.brandColour};
            font-family: ${fonts.supporting};
            font-size: 14px;
            line-height: 40px;
            font-weight: normal;
            text-align: center;
            background-color: white;
            border: 0;

            .Opta-Icon {
              height: 38px;
              margin: 0 10px 0 0;

              :after {
                background-position: -180px -19px;
              }
            }

            .Opta-Title {
              height: 38px;
              padding: 0 0 0 18px;
              line-height: 40px;
            }

            &.Opta-Open {
              .Opta-Icon {
                :after {
                  background-position: -149px -20px;
                }
              }
            }
          }

          ul {
            display: none;
            top: 0;
            list-style-type: none;
            background-color: ${colours.functional.backgroundPrimary};
            border: 0;
            border-top: 1px solid ${colours.functional.brandColour};

            li {
              margin: 0;
              text-align: center;

              a {
                height: 28px;
                padding: 0;
                color: ${colours.functional.primary};
                font-family: ${fonts.supporting};
                font-size: 14px;
                line-height: 30px;
                background-color: transparent;

                &:hover {
                  color: ${colours.functional.brandColour};
                  font-weight: bold;
                  background-color: white;
                }
              }

              &:first-of-type {
                a {
                  height: 32px;
                  padding-top: 4px;
                }
              }

              &:last-of-type {
                a {
                  height: 32px;
                  padding-bottom: 4px;
                }
              }
            }
          }
        }
      }

      ul.Opta-TabbedContent {
        margin: 0;
        padding: 0;
        list-style-type: none;

        li {
          display: none;

          &.Opta-On {
            display: block;
          }

          h3 {
            display: none;
            text-decoration: none !important;

            .Opta-Icon {
              display: none;
            }
          }
        }
      }

      table {
        thead {
          background-color: ${colours.functional.backgroundSecondary};

          tr {
            height: 40px;

            th {
              padding: 0;
              color: ${colours.functional.primary};
              font-family: ${fonts.supporting};
              font-size: 14px;
              line-height: 14px;
              font-weight: normal;
              text-align: center;
              background-color: transparent;

              abbr {
                font-size: inherit;
                line-height: inherit;
                text-decoration: none;
              }

              &.Opta-Team {
                width: auto !important;
              }

              &:last-of-type {
                padding: 0 10px 0 0;
              }
            }
          }
        }

        tbody {
          tr {
            height: 40px;
            border-bottom: 1px solid #e4e4e4;

            th {
              width: 42px;
              padding: 6px 0 0 0;
              color: ${colours.section.sport};
              font-family: ${fonts.supporting};
              font-size: 14px;
              line-height: 14px;
              font-weight: normal;
              text-align: center;
              background-color: transparent;

              @media (min-width: ${breakpoints.medium}px) {
                width: 50px;
                font-size: 16px;
                line-height: 16px;
              }
            }

            td {
              width: 30px;
              padding: 3px 0 0 0;
              color: ${colours.functional.brandColour};
              font-family: ${fonts.headline};
              font-size: 14px;
              line-height: 14px;
              text-align: center;
              background-color: transparent;

              &:last-of-type {
                width: 40px;
                padding: 3px 10px 0 0;
              }

              &.Opta-Team {
                width: auto !important;
                text-align: left;
              }

              .Opta-Image {
                width: 20px;
                margin-top: -3px;

                img {
                  width: 20px;
                }
              }

              @media (min-width: ${breakpoints.medium}px) {
                width: 40px;
                font-size: 16px;
                line-height: 16px;

                &:last-of-type {
                  width: 50px;
                }
              }
            }
          }
        }
      }
    }
  }
`;

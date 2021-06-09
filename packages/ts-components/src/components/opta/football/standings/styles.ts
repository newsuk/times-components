import styled from 'styled-components';
import { breakpoints, colours, fonts } from '@times-components/styleguide';

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
      line-height: 40px;
      font-weight: normal;
      background-color: ${colours.functional.keyline};

      @media (min-width: ${breakpoints.medium}px) {
        padding-left: 20px;
      }
    }

    .Opta-Nav {
      width: 100px;
      margin: 20px auto;
      border: 1px solid ${colours.functional.brandColour};

      h3 {
        margin: 0;
        padding: 10px;
        color: ${colours.functional.primary};
        font-family: ${fonts.supporting};
        font-size: 14px;
        line-height: 14px;
        font-weight: normal;
        text-align: center;

        &:after {
          display: inline-block;
          content: '\\E001';
          font-size: 6px;
          font-family: iconfont;
          padding: 0 0 0 10px;
          vertical-align: middle;
        }

        &.Opta-Open {
          &:after {
            content: '\\E004';
          }
        }
      }

      ul {
        display: none;
        margin: 0;
        padding: 10px;
        list-style-type: none;
        background-color: ${colours.functional.backgroundSecondary};
        border-top: 1px solid ${colours.functional.brandColour};

        li {
          margin: 2px 0;
          text-align: center;

          a {
            color: ${colours.functional.secondary};
            font-family: ${fonts.supporting};
            font-size: 14px;
            line-height: 14px;

            &:hover {
              color: ${colours.functional.primary};
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

            abbr {
              text-decoration: none;
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
          border-bottom: 1px solid ${colours.functional.keyline};

          th {
            width: 42px;
            padding: 6px 0 0 0;
            color: ${colours.section.sport};
            font-family: ${fonts.supporting};
            font-size: 14px;
            line-height: 14px;
            font-weight: normal;
            text-align: center;

            @media (min-width: ${breakpoints.medium}px) {
              width: 50px;
              font-size: 16px;
              line-height: 16px;
            }
          }

          td {
            width: 30px;
            padding: 3px 0 0 0;
            color: ${colours.functional.primary};
            font-family: ${fonts.headline};
            font-size: 14px;
            line-height: 14px;
            text-align: center;

            &:last-of-type {
              width: 40px;
              padding: 3px 10px 0 0;
            }

            &.Opta-Team {
              width: auto;
              text-align: left;
            }

            .Opta-Image {
              width: 20px;
              height: 20px;
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
`;

import styled from 'styled-components';
import { colours, fonts } from '@times-components/ts-styleguide';

export const WidgetContainerBase = styled.div`
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

import styled from 'styled-components';
import { breakpoints, colours, fonts } from '@times-components/styleguide';

export const Container = styled.div<{ border: boolean; fullWidth?: boolean }>`
  margin: 0 auto 20px auto;
  background-color: ${colours.functional.backgroundPrimary};
  border-top: ${({ border }) =>
    border ? `2px solid ${colours.section.sport}` : 'none'};

  a {
    text-decoration: none;
  }

  @media (min-width: ${breakpoints.medium}px) {
    flex-direction: row;
    width: ${({ fullWidth }) => (fullWidth ? '100%' : '80.8%')};
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: ${({ fullWidth }) => (fullWidth ? '100%' : '56.2%')};
  }
`;

export const PlaceholderContainer = styled.div`
  position: relative;
  height: 200px;
`;

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

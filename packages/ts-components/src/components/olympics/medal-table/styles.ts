import styled from 'styled-components';
import { breakpoints, colours, fonts } from '@times-components/styleguide';

export const Container = styled.div<{
  sectionColour: string;
  showAll: boolean;
}>`
  position: relative;
  margin: 0 auto 20px auto;

  @media (min-width: ${breakpoints.medium}px) {
    width: 80.8%;
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
  }

  .pa-medaltable {
    .pa_MedalTableView_medaltable {
      font-size: 16px;
      color: ${fonts.brandColour};
      font-family: ${fonts.headline};
      background-color: ${colours.functional.backgroundPrimary};
      padding-bottom: 60px;

      .pa_MedalTableView_header-bg {
        height: 48px;
        background: ${colours.functional.backgroundSecondary};
      }

      table {
        margin-top: -48px;

        thead {
          color: ${colours.functional.brandColour};
          line-height: 48px;
          font-family: ${fonts.supporting};
          font-size: 14px;
        }
        th {
          width: 40px;
          max-width: 40px;
          min-width: 40px;
          :nth-child(2) {
            width: auto;
          }
          :nth-child(1),
          :nth-child(6) {
            width: 60px;
            max-width: 60px;
            min-width: 60px;
          }
        }
      }

      tbody {
        tr {
          background-color: ${colours.functional.backgroundPrimary};
          border-bottom: 1px solid ${colours.functional.keyline};
          color: ${colours.functional.brandColour};

          td {
            padding: 8px 0 3px;
          }

          td:first-child {
            font-family: ${fonts.supporting};
            color: ${({ sectionColour }) => sectionColour};
          }

          &:nth-child(n + 8) {
            display: ${({ showAll }) => (showAll ? 'table-row' : 'none')};
          }

          &.pa_MedalTableView_highlight {
            display: table-row;
            background-color: #e4e4e4;
          }
        }
      }
    }
    .pa_OdfFooter_ctr {
      position: relative;
      top: 60px;
      font-family: ${fonts.supporting};
      color: ${colours.functional.brandColour};
    }
  }
  .buttonContainer {
    text-align: center;
    height: 0;
  }
`;

export const Button = styled.button`
  font-family: ${fonts.supporting};
  font-size: 14px;
  line-height: 20px;
  padding: 14px 16px;
  border: 1px solid ${colours.functional.keyline};

  top: -80px;
  position: relative;
`;

import styled from 'styled-components';
import { breakpoints, colours, fonts } from '@times-components/styleguide';

export const Container = styled.div<{
  sectionColour: string;
  showAll: boolean;
  inArticle: boolean;
}>`
  border-top: 2px solid ${({ sectionColour }) => sectionColour};
  position: relative;
  margin: 0 auto 20px auto;

  @media (min-width: ${breakpoints.medium}px) {
    width: ${({ inArticle }) => (inArticle ? `80.8%` : undefined)};
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: ${({ inArticle }) => (inArticle ? `56.2%` : undefined)};
  }

  .pa-schedule {
    .pa_ScheduleHeader_header {
      color: ${colours.functional.brandColour};
      font-family: ${fonts.supporting};
      font-size: 18px;
      background: ${colours.functional.backgroundSecondary};
    }

    .pa_ScheduleHeader_filterbar {
      color: ${colours.functional.brandColour};
      font-family: ${fonts.supporting};
      background: ${colours.functional.backgroundSecondary};
      font-size: 16px;
    }

    .pa_LoadingOverlayContainer_ctr {
      .pa_UnitListView_ctr {
        font-family: ${fonts.supporting};
        font-size: 16px;

        ul.pa_UnitListView_list li {
          background-color: ${colours.functional.backgroundPrimary};
          color: ${colours.functional.brandColour};
          padding: 10px 6px 8px 10px;
          &:nth-child(n + 8) {
            display: ${({ showAll }) => (showAll ? 'block' : 'none')};
          }
          border-bottom: 1px solid ${colours.functional.keyline};
        }

        .pa_UnitListView_unit-time {
          color: ${({ sectionColour }) => sectionColour};
          line-height: 30px;
          position: absolute;
        }

        .pa_UnitListView_unit-text {
          font-family: ${fonts.supporting};
          font-size: 16px;
          margin-right: 50px;
        }

        .pa_UnitListView_discipline {
          font-family: ${fonts.headline};
          text-transform: capitalize;
          font-weight: 400;
          padding-bottom: 4px;
        }

        .pa_UnitListView_medal {
          position: relative;
          left: calc(100% - 65px);
          align-self: center;
          @media only screen and (min-width: 321px) {
            left: calc(100% - 75px);
          }
        }
      }
    }

    .pa_OdfFooter_ctr {
      font-family: ${fonts.supporting};
      font-size: 12px;
      top: 60px;
      position: relative;
    }

    .pa_UnitListView_message {
      min-height: 70px;
      background-color: ${colours.functional.backgroundPrimary};
    }

    .pa_Schedule_ctr {
      background: ${colours.functional.backgroundSecondary};
      padding-bottom: 60px;
    }

    .pa_ErrorMessage_ctr {
      background: #ededed;
    }
  }
  .buttonContainer {
    text-align: center;
    height: 0;
    button {
      background-color: ${colours.functional.backgroundPrimary};
      :hover {
        background-color: ${colours.functional.backgroundSecondary};
      }
    }
  }
`;

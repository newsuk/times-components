import styled from 'styled-components';
import { breakpoints, colours, fonts } from '@times-components/styleguide';

export const Container = styled.div<{
  sectionColour: string;
  inArticle: boolean;
}>`
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

    .pa_UnitListView_ctr {
      height: 400px;
    }

    .pa_LoadingOverlayContainer_ctr {
      .pa_UnitListView_ctr {
        font-family: ${fonts.supporting};
        font-size: 16px;

        ul.pa_UnitListView_list li {
          background-color: ${colours.functional.backgroundPrimary};
          color: ${colours.functional.brandColour};
          border-bottom: 1px solid ${colours.functional.keyline};
        }

        .pa_UnitListView_unit-time {
          color: ${({ sectionColour }) => sectionColour};
          line-height: 30px;
        }

        .pa_UnitListView_unit-text {
          font-family: ${fonts.supporting};
          font-size: 14px;
        }

        .pa_UnitListView_discipline {
          font-family: ${fonts.headline};
          text-transform: capitalize;
          font-weight: 400;
        }
      }
    }

    .pa_OdfFooter_ctr {
      font-family: ${fonts.supporting};
      font-size: 12px;
    }

    .pa_UnitListView_message {
      min-height: 70px;
      background-color: ${colours.functional.backgroundPrimary};
    }

    .pa_Schedule_ctr {
      background: ${colours.functional.backgroundSecondary};
    }

    .pa_ErrorMessage_ctr {
      background: #ededed;
    }
  }
`;

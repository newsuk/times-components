// IMPORTANT: This component is in the process of being moved to the main repository.
// Please avoid making any changes to this file for the time being.
// For updates or modifications, refer to the main repository once the move is complete.
// In case of emergencies, please reach out to reader-experience team for further assistance.

import { Block, getMediaQueryFromTheme, styled } from 'newskit';

export const LeadArticles = styled(Block)`
  ${getMediaQueryFromTheme('md')} {
    hr[aria-label='article-divider-horizontal'] {
      display: none;
    }
  }
`;

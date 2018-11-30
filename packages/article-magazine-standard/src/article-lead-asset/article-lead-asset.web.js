import styled from "styled-components";
import { breakpoints, spacing } from "@times-components/styleguide";

import { LeadAsset as UnstyledLeadAsset } from "@times-components/article-skeleton";

const LeadAsset = styled(UnstyledLeadAsset)`
  order: 2;

  @media (min-width: ${breakpoints.medium}px) {
    margin-bottom: ${spacing(6)};
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
    margin-left: auto;
    margin-right: auto;
  }
`;

export default LeadAsset;

import styled from "styled-components";
import { breakpoints, spacing } from "@times-components/styleguide"

import { LeadAsset as UnstyledLeadAsset } from "@times-components/article-skeleton";

const LeadAsset = styled(UnstyledLeadAsset)`
  margin-bottom: ${spacing(2)};

  @media (min-width: ${breakpoints.medium}px) {
    margin-bottom: ${spacing(4)};
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
    margin: 0 auto;
    padding-bottom: 20px;
  }
`;

export default LeadAsset;

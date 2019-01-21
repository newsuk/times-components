import React from "react";
import { LeadOneAndTwoSlice } from "@times-components/slice";
import { PrimaryTile } from "@times-components/tile";

const LeadOneAndOneSlice = ({ lead, support }) => (
  <LeadOneAndTwoSlice
    renderLead={() => (<PrimaryTile tile={lead} withImage />)}
    renderSupport1={() => (<PrimaryTile tile={support} withImage={false} />)}
    renderSupport2={() => null}
  />
);

export default LeadOneAndOneSlice;

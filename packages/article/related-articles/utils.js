import { DefaultSlice, LeadSlice } from "@times-components/slice";

export default template => {
  switch (template) {
    case "DEFAULT":
    default:
      return DefaultSlice;
    case "LEAD_AND_TWO":
      return LeadSlice;
    // case 'OPINION':
    //   return OpinionSlice;
  }
};

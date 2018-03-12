import React from "react";
import { DefaultSlice, LeadSlice } from "@times-components/slice";

export default (template, renderArticleItems) => {
  switch (template) {
    case "DEFAULT":
    default:
      return <DefaultSlice>{renderArticleItems()}</DefaultSlice>;
    case "LEAD_AND_TWO":
      return (
        <LeadSlice
          lead={renderArticleItems()[0]}
          support1={renderArticleItems()[1]}
          support2={renderArticleItems()[2]}
        />
      );
  }
};

import React from "react";
import PaginationBase, { withPageState } from "./pagination.base";
import withTrackEvents from "./track";

const Pagination = props => <PaginationBase {...props} hideBorderTop={false} />;

export default withTrackEvents(Pagination);
export { withPageState };

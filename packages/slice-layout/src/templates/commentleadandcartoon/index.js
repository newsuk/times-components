import React from "react";
import Column from "../column";
import propTypes from "./proptypes";

const CommentLeadAndCartoon = ({ renderLead, renderCartoon }) => (
  <Column tiles={[renderLead, renderCartoon]} />
);

CommentLeadAndCartoon.propTypes = propTypes;

export default CommentLeadAndCartoon;

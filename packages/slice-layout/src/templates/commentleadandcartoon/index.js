import React from "react";
import { ColumnLayout } from "../shared";
import propTypes from "./proptypes";

const CommentLeadAndCartoon = ({ renderLead, renderCartoon }) => (
  <ColumnLayout tiles={[renderLead, renderCartoon]} />
);

CommentLeadAndCartoon.propTypes = propTypes;

export default CommentLeadAndCartoon;

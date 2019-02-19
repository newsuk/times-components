import React from "react";
import { View } from "react-native";
import { ItemRowSeparator } from "../shared";
import propTypes from "./proptypes";

const CommentLeadAndCartoon = ({ renderLead, renderCartoon }) => (
  <View>
    {renderLead()}
    <ItemRowSeparator />
    {renderCartoon()}
  </View>
);

CommentLeadAndCartoon.propTypes = propTypes;

export default CommentLeadAndCartoon;

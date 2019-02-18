import React from "react";
import { View } from "react-native";
import { CommentLeadAndCartoon } from "@times-components/slice-layout";
import PropTypes from "prop-types";
import { TileP, TileQ } from "../../tiles";

const CommentLeadAndCartoonSlice = ({ onPress, slice: {lead, cartoon} }) => (
  <View>
    <CommentLeadAndCartoon
      renderCartoon={() => <TileQ onPress={onPress} tile={cartoon} />}
      renderLead={() => <TileP onPress={onPress} tile={lead} />}
    />
  </View>
);

CommentLeadAndCartoonSlice.propTypes = {
  onPress: PropTypes.func.isRequired,
  slice: PropTypes.shape({
    cartoon: PropTypes.shape({}).isRequired,
    lead: PropTypes.shape({}).isRequired
  }).isRequired
};

export default CommentLeadAndCartoonSlice;

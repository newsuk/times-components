import React from "react";
import { View } from "react-native";
import { CommentLeadAndCartoon } from "@times-components/slice-layout";
import PropTypes from "prop-types";
import { TileP, TileQ } from "../../tiles";

const CommentLeadAndCartoonSlice = ({ lead, cartoon, onPress }) => (
  <View>
    <CommentLeadAndCartoon
      renderCartoon={() => <TileQ onPress={onPress} tile={cartoon} />}
      renderLead={() => <TileP onPress={onPress} tile={lead} />}
    />
  </View>
);

CommentLeadAndCartoonSlice.propTypes = {
  cartoon: PropTypes.shape({}).isRequired,
  lead: PropTypes.shape({}).isRequired,
  onPress: PropTypes.func.isRequired
};

export default CommentLeadAndCartoonSlice;

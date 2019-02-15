import React from "react";
import { View } from "react-native";
import { CommentLeadAndCartoon } from "@times-components/slice-layout";
import PropTypes from "prop-types";
import { TileP, TileQ } from "../../tiles";


const CommentLeadAndCartoonSlice = ({ lead, cartoon, onPress }) => (
  <View>
    <CommentLeadAndCartoon
      renderLead={() => <TileP onPress={onPress} tile={lead} />}
      renderCartoon={() => <TileQ onPress={onPress} tile={cartoon} />}
    />
  </View>
);

CommentLeadAndCartoonSlice.propTypes = {
  lead: PropTypes.shape({}).isRequired,
  cartoon: PropTypes.shape({}).isRequired,
  onPress: PropTypes.func.isRequired
};

export default CommentLeadAndCartoonSlice;

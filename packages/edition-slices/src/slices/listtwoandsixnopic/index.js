import React, { Component } from "react";
import PropTypes from "prop-types";
import { ListTwoAndSixNoPic } from "@times-components/slice-layout";
import { ResponsiveSlice } from "../shared";
import { TileL, TileC } from "../../tiles";

class ListTwoAndSixNoPicSlice extends Component {
  constructor(props) {
    super(props);
    this.renderSlice = this.renderSlice.bind(this);
  }

  renderSlice(breakpoint) {
    const {
      onPress,
      slice: {
        lead1,
        lead2,
        support1,
        support2,
        support3,
        support4,
        support5,
        support6
      }
    } = this.props;

    return (
      <ListTwoAndSixNoPic
        breakpoint={breakpoint}
        renderLead1={() => (
          <TileC onPress={onPress} tile={lead1} tileName="lead1" />
        )}
        renderLead2={() => (
          <TileC onPress={onPress} tile={lead2} tileName="lead2" />
        )}
        renderSupport1={() => (
          <TileL onPress={onPress} tile={support1} tileName="support1" />
        )}
        renderSupport2={() => (
          <TileL onPress={onPress} tile={support2} tileName="support2" />
        )}
        renderSupport3={() => (
          <TileL onPress={onPress} tile={support3} tileName="support3" />
        )}
        renderSupport4={() => (
          <TileL onPress={onPress} tile={support4} tileName="support4" />
        )}
        renderSupport5={() => (
          <TileL onPress={onPress} tile={support5} tileName="support5" />
        )}
        renderSupport6={() => (
          <TileL onPress={onPress} tile={support6} tileName="support6" />
        )}
      />
    );
  }

  render() {
    return (
      <ResponsiveSlice
        renderMedium={this.renderSlice}
        renderSmall={this.renderSlice}
      />
    );
  }
}

ListTwoAndSixNoPicSlice.propTypes = {
  onPress: PropTypes.func.isRequired,
  slice: PropTypes.shape({
    lead1: PropTypes.shape({}).isRequired,
    lead2: PropTypes.shape({}).isRequired,
    support1: PropTypes.shape({}).isRequired,
    support2: PropTypes.shape({}).isRequired,
    support3: PropTypes.shape({}).isRequired,
    support4: PropTypes.shape({}).isRequired,
    support5: PropTypes.shape({}).isRequired,
    support6: PropTypes.shape({}).isRequired
  }).isRequired
};

export default ListTwoAndSixNoPicSlice;

import React, { Component } from "react";
import PropTypes from "prop-types";
import { TileA, TileW } from "../../tiles";
import { ResponsiveSlice } from "../shared";

class SecondaryOneSlice extends Component {
  constructor(props) {
    super(props);
    this.renderSmall = this.renderSmall.bind(this);
    this.renderMedium = this.renderMedium.bind(this);
  }

  renderSmall() {
    const {
      onPress,
      slice: { secondary }
    } = this.props;
    return <TileA onPress={onPress} tile={secondary} tileName="secondary" />;
  }

  renderMedium() {
    const {
      onPress,
      slice: { secondary }
    } = this.props;
    return <TileW onPress={onPress} tile={secondary} tileName="secondary" />;
  }

  render() {
    return (
      <ResponsiveSlice
        renderMedium={this.renderMedium}
        renderSmall={this.renderSmall}
      />
    );
  }
}

SecondaryOneSlice.propTypes = {
  onPress: PropTypes.func.isRequired,
  slice: PropTypes.shape({ secondary: PropTypes.shape({}).isRequired })
    .isRequired
};

export default SecondaryOneSlice;

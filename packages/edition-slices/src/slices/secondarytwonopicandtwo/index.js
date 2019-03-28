import React, { Component } from "react";
import PropTypes from "prop-types";
import { SecondaryTwoNoPicAndTwoSlice } from "@times-components/slice-layout";
import { TileAE, TileB, TileG } from "../../tiles";
import { ResponsiveSlice } from "../shared";

class SecondaryTwoNoPicAndTwo extends Component {
  constructor(props) {
    super(props);
    this.renderSmall = this.renderSmall.bind(this);
    this.renderMedium = this.renderMedium.bind(this);
  }

  renderSmall(breakpoint) {
    const {
      onPress,
      slice: { secondary1, secondary2, support1, support2 }
    } = this.props;

    return (
      <SecondaryTwoNoPicAndTwoSlice
        breakpoint={breakpoint}
        renderSecondary1={() => (
          <TileB onPress={onPress} tile={secondary1} tileName="secondary1" />
        )}
        renderSecondary2={() => (
          <TileB onPress={onPress} tile={secondary2} tileName="secondary2" />
        )}
        renderSupport1={() => (
          <TileG onPress={onPress} tile={support1} tileName="support1" />
        )}
        renderSupport2={() => (
          <TileG onPress={onPress} tile={support2} tileName="support2" />
        )}
      />
    );
  }

  renderMedium(breakpoint) {
    const {
      onPress,
      slice: { secondary1, secondary2, support1, support2 }
    } = this.props;

    return (
      <SecondaryTwoNoPicAndTwoSlice
        breakpoint={breakpoint}
        renderSecondary1={() => (
          <TileAE onPress={onPress} tile={secondary1} tileName="secondary1" />
        )}
        renderSecondary2={() => (
          <TileAE onPress={onPress} tile={secondary2} tileName="secondary2" />
        )}
        renderSupport1={() => (
          <TileG onPress={onPress} tile={support1} tileName="support1" />
        )}
        renderSupport2={() => (
          <TileG onPress={onPress} tile={support2} tileName="support2" />
        )}
      />
    );
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

SecondaryTwoNoPicAndTwo.propTypes = {
  onPress: PropTypes.func.isRequired,
  slice: PropTypes.shape({
    secondary1: PropTypes.shape({}).isRequired,
    secondary2: PropTypes.shape({}).isRequired,
    support1: PropTypes.shape({}).isRequired,
    support2: PropTypes.shape({}).isRequired
  }).isRequired
};

export default SecondaryTwoNoPicAndTwo;

import React, { Component } from "react";
import PropTypes from "prop-types";
import { SecondaryFourSlice } from "@times-components/slice-layout";
import { TileC } from "../../tiles";
import { ResponsiveSlice } from "../shared";

class SecondaryFour extends Component {
  constructor(props) {
    super(props);
    this.renderSlice = this.renderSlice.bind(this);
  }

  renderSlice(breakpoint) {
    const {
      onPress,
      slice: { secondary1, secondary2, secondary3, secondary4 }
    } = this.props;

    return (
      <SecondaryFourSlice
        breakpoint={breakpoint}
        renderSecondary1={() => (
          <TileC onPress={onPress} tile={secondary1} tileName="secondary1" />
        )}
        renderSecondary2={() => (
          <TileC onPress={onPress} tile={secondary2} tileName="secondary2" />
        )}
        renderSecondary3={() => (
          <TileC onPress={onPress} tile={secondary3} tileName="secondary3" />
        )}
        renderSecondary4={() => (
          <TileC onPress={onPress} tile={secondary4} tileName="secondary4" />
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

SecondaryFour.propTypes = {
  onPress: PropTypes.func.isRequired,
  slice: PropTypes.shape({
    secondary1: PropTypes.shape({}).isRequired,
    secondary2: PropTypes.shape({}).isRequired,
    secondary3: PropTypes.shape({}).isRequired,
    secondary4: PropTypes.shape({}).isRequired
  }).isRequired
};

export default SecondaryFour;

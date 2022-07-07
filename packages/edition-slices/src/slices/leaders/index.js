import React, { Component } from "react";
import { TcView, TcText, checkStylesForUnits } from "@times-components/utils";
import { SectionContext } from "@times-components/context";
import { Leaders } from "@times-components/slice-layout";
import PropTypes from "prop-types";
import { TileM } from "../../tiles";
import styleFactory from "./styles";
import { ResponsiveSlice } from "../shared";
import MastHead from "./masthead";

const renderHead = (styles, breakpoint) => (
  <SectionContext.Consumer>
    {({ publicationName }) => (
      <TcView style={styles.mastheadContainer}>
        <MastHead breakpoint={breakpoint} publicationName={publicationName} />
        <TcView style={styles.headingContainer}>
          <TcText
            style={checkStylesForUnits({ ...styles.heading, ...styles.text })}
          >
            {" "}
            Leading Articles{" "}
          </TcText>
        </TcView>
      </TcView>
    )}
  </SectionContext.Consumer>
);

class LeadersSlice extends Component {
  constructor(props) {
    super(props);
    this.renderSlice = this.renderSlice.bind(this);
  }

  renderSlice(breakpoint) {
    const {
      onPress,
      slice: { leader1, leader2, leader3 }
    } = this.props;
    const styles = styleFactory(breakpoint);

    return (
      <TcView style={styles.container}>
        {renderHead(styles, breakpoint)}
        <Leaders
          breakpoint={breakpoint}
          leader1={
            <TileM
              breakpoint={breakpoint}
              onPress={onPress}
              tile={leader1}
              tileName="leader1"
            />
          }
          leader2={
            <TileM
              breakpoint={breakpoint}
              onPress={onPress}
              tile={leader2}
              tileName="leader2"
            />
          }
          leader3={
            <TileM
              breakpoint={breakpoint}
              onPress={onPress}
              tile={leader3}
              tileName="leader3"
            />
          }
        />
      </TcView>
    );
  }

  render() {
    return (
      <ResponsiveSlice
        renderSmall={this.renderSlice}
        renderMedium={this.renderSlice}
      />
    );
  }
}

LeadersSlice.propTypes = {
  onPress: PropTypes.func.isRequired,
  slice: PropTypes.shape({
    leader1: PropTypes.shape({}).isRequired,
    leader2: PropTypes.shape({}).isRequired,
    leader3: PropTypes.shape({}).isRequired
  }).isRequired
};

export default LeadersSlice;

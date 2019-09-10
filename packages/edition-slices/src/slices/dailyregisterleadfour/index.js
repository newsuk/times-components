import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import {
  ItemRowSeparator,
  ItemColSeparator
} from "@times-components/slice-layout";
import { ResponsiveSlice } from "../shared";
import { TileS } from "../../tiles";
import styleFactory from "./styles";
import Logo from "./logo";

class DailyRegisterLeadFour extends Component {
  constructor(props) {
    super(props);
    this.renderSmall = this.renderSmall.bind(this);
    this.renderMedium = this.renderMedium.bind(this);
  }

  renderSmall(breakpoint) {
    const {
      slice: { birthdaysToday, briefing, natureNotes, onThisDay }
    } = this.props;
    const styles = styleFactory(breakpoint);

    return (
      <View style={styles.container}>
        <Logo
          imageUri="https://www.thetimes.co.uk/d/img/DUR-masthead-40fe00731f.png"
          ratio={1}
          style={styles.mastheadLogo}
          type="logo"
        />
        <Text style={styles.title}>Daily Universal Register</Text>
        <TileS tile={briefing} breakpoint={breakpoint} />
        <ItemRowSeparator style={styles.separator} />
        <TileS tile={onThisDay} breakpoint={breakpoint} />
        <ItemRowSeparator style={styles.separator} />
        <Logo
          imageUri="https://www.thetimes.co.uk/d/img/DUR-nature-80d36dd1cd.png"
          ratio={1}
          style={styles.imageWrapper}
          type="nature notes"
        />
        <TileS tile={natureNotes} breakpoint={breakpoint} />
        <ItemRowSeparator style={styles.separator} />
        <Logo
          imageUri="https://www.thetimes.co.uk/d/img/DUR-birthdays-94b2272911.png"
          ratio={1}
          style={styles.imageWrapper}
          type="birthdays"
        />
        <TileS tile={birthdaysToday} breakpoint={breakpoint} />
      </View>
    );
  }

  renderMedium(breakpoint) {
    const {
      slice: { birthdaysToday, briefing, natureNotes, onThisDay }
    } = this.props;
    const styles = styleFactory(breakpoint);

    const natureLogo = (
      <Logo
        imageUri="https://www.thetimes.co.uk/d/img/DUR-nature-80d36dd1cd.png"
        ratio={1}
        style={styles.imageWrapper}
        type="nature notes"
      />
    );

    const birthdayLogo = (
      <Logo
        imageUri="https://www.thetimes.co.uk/d/img/DUR-birthdays-94b2272911.png"
        ratio={1}
        style={styles.imageWrapper}
        type="birthdays"
      />
    );

    return (
      <View style={styles.container}>
        <Logo
          imageUri="https://www.thetimes.co.uk/d/img/DUR-masthead-40fe00731f.png"
          ratio={1}
          style={styles.mastheadLogo}
          type="logo"
        />
        <Text style={styles.title}>Daily Universal Register</Text>
        <View style={styles.itemsContainer}>
          <View style={styles.column}>
            <TileS tile={briefing} breakpoint={breakpoint} />
            <ItemRowSeparator style={styles.rowSeparator} />
            <TileS
              tile={natureNotes}
              breakpoint={breakpoint}
              logo={natureLogo}
            />
          </View>
          <ItemColSeparator style={styles.colSeparator} />
          <View style={styles.column}>
            <TileS tile={onThisDay} breakpoint={breakpoint} />
            <ItemRowSeparator style={styles.rowSeparator} />
            <TileS
              tile={birthdaysToday}
              breakpoint={breakpoint}
              logo={birthdayLogo}
            />
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <ResponsiveSlice
        renderSmall={this.renderSmall}
        renderMedium={this.renderMedium}
      />
    );
  }
}

DailyRegisterLeadFour.propTypes = {
  slice: PropTypes.shape({
    birthdaysToday: PropTypes.shape({}).isRequired,
    briefing: PropTypes.shape({}).isRequired,
    natureNotes: PropTypes.shape({}).isRequired,
    onThisDay: PropTypes.shape({}).isRequired
  }).isRequired
};

export default DailyRegisterLeadFour;

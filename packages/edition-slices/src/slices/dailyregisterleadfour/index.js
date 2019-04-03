import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { ItemRowSeparator } from "@times-components/slice-layout";
import { ResponsiveSlice } from "../shared";
import { TileS } from "../../tiles";
import styleFactory from "./styles";
import Logo from "./logo";

class DailyRegisterLeadFour extends Component {
  constructor(props) {
    super(props);
    this.renderSlice = this.renderSlice.bind(this);
    this.renderHuge = this.renderHuge.bind(this);
  }

  renderSlice(breakpoint) {
    const {
      slice: { birthdaysToday, briefing, natureNotes, onThisDay }
    } = this.props;
    const styles = styleFactory(breakpoint);

    return (
      <View style={styles.container}>
        <Logo
          imageUri="https://www.thetimes.co.uk/d/img/DUR-masthead-40fe00731f.png"
          ratio={1435 / 250}
          style={styles.mastheadLogo}
          type="logo"
        />
        <Text style={styles.title}>Daily Universal Register</Text>
        <TileS tile={briefing} />
        <ItemRowSeparator style={styles.separator} />
        <TileS tile={onThisDay} />
        <ItemRowSeparator style={styles.separator} />
        <Logo
          imageUri="https://www.thetimes.co.uk/d/img/DUR-nature-80d36dd1cd.png"
          ratio={1 / 1}
          style={styles.imageWrapper}
          type="nature notes"
        />
        <TileS tile={natureNotes} />
        <ItemRowSeparator style={styles.separator} />
        <Logo
          imageUri="https://www.thetimes.co.uk/d/img/DUR-birthdays-94b2272911.png"
          ratio={1 / 1}
          style={styles.imageWrapper}
          type="birthdays"
        />
        <TileS tile={birthdaysToday} />
      </View>
    );
  }

  renderHuge(breakpoint) {
    const {
      slice: { birthdaysToday, briefing, natureNotes, onThisDay }
    } = this.props;
    const styles = styleFactory(breakpoint);

    return (
      <View style={styles.container}>
        <Logo
          imageUri="https://www.thetimes.co.uk/d/img/DUR-masthead-40fe00731f.png"
          ratio={1435 / 250}
          style={styles.mastheadLogo}
          type="logo"
        />
        <Text style={styles.title}>Daily Universal Register</Text>
        <ItemRowSeparator style={styles.separator} />
        <View style={styles.rowItems}>
          <View style={styles.item}>
            <TileS tile={briefing} />
          </View>
          <View style={styles.item}>
            <TileS tile={onThisDay} />
          </View>
        </View>
        <ItemRowSeparator style={styles.separator} />
        <View style={styles.rowItems}>
          <View style={styles.columnItems}>
            <Logo
              imageUri="https://www.thetimes.co.uk/d/img/DUR-nature-80d36dd1cd.png"
              ratio={1 / 1}
              style={styles.imageWrapper}
              type="nature notes"
            />
            <View style={styles.item}>
              <TileS tile={natureNotes} />
            </View>
          </View>
          <View style={styles.columnItems}>
            <Logo
              imageUri="https://www.thetimes.co.uk/d/img/DUR-birthdays-94b2272911.png"
              ratio={1 / 1}
              style={styles.imageWrapper}
              type="birthdays"
            />
            <View style={styles.item}>
              <TileS tile={birthdaysToday} />
            </View>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <ResponsiveSlice
        renderHuge={this.renderHuge}
        renderMedium={this.renderSlice}
        renderSmall={this.renderSlice}
        renderWide={this.renderSlice}
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

import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { ItemRowSeparator } from "@times-components/slice-layout";
import { TileS } from "../../tiles";
import leaves from "../../../assets/leaves.png";
import cake from "../../../assets/cake.png";
import registerLogo from "../../../assets/daily-register-logo.png";
import styles from "./styles";
import Logo from "./logo";

const DailyRegisterLeadFour = ({
  slice: { birthdaysToday, briefing, natureNotes, onThisDay }
}) => (
  <View style={styles.container}>
    <Logo
      imageSrc={registerLogo}
      imageUri="https://www.thetimes.co.uk/d/img/DUR-masthead-40fe00731f.png"
      ratio={1435 / 250}
      style={styles.mastheadLogo}
    />
    <Text style={styles.title}>Daily Universal Register</Text>
    <TileS tile={briefing} />
    <ItemRowSeparator style={styles.separator} />
    <TileS tile={onThisDay} />
    <ItemRowSeparator style={styles.separator} />
    <Logo
      imageSrc={leaves}
      imageUri="https://www.thetimes.co.uk/d/img/DUR-nature-80d36dd1cd.png"
      ratio={1 / 1}
      style={styles.imageWrapper}
    />
    <TileS tile={natureNotes} />
    <ItemRowSeparator style={styles.separator} />
    <Logo
      imageSrc={cake}
      imageUri="https://www.thetimes.co.uk/d/img/DUR-birthdays-94b2272911.png"
      ratio={1 / 1}
      style={styles.imageWrapper}
    />
    <TileS tile={birthdaysToday} />
  </View>
);

DailyRegisterLeadFour.propTypes = {
  slice: PropTypes.shape({
    birthdaysToday: PropTypes.shape({}).isRequired,
    briefing: PropTypes.shape({}).isRequired,
    natureNotes: PropTypes.shape({}).isRequired,
    onThisDay: PropTypes.shape({}).isRequired
  }).isRequired
};

export default DailyRegisterLeadFour;

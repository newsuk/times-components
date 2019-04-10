import React from "react";
import { View, Text } from "react-native";
import Link from "@times-components/link";
import { IconEmail, IconFacebook, IconTwitter } from "@times-components/icons";
import styles from "./styles";

const SaveAndShareBar = () => (
  <View style={styles.container}>
    <View style={styles.rowItem}>
      <Text>Share</Text>
      <Link responsiveLinkStyles={styles.link} url={'https://www.thetimes.co.uk/'}>
        <IconEmail fillColour={styles.svgIcon.fillColour} height={styles.svgIcon.height} />
      </Link>
      <Link responsiveLinkStyles={styles.link} url={'https://www.thetimes.co.uk/'}>
        <IconFacebook fillColour={styles.svgIcon.fillColour} height={styles.svgIcon.height} />
      </Link>
      <Link responsiveLinkStyles={styles.link} target={'_blank'}  url={'https://twitter.com/intent/tweet?text=https://www.thetimes.co.uk/edition/news/don-t-humiliate-theresa-may-over-brexit-extension-tusk-warns-macron-qv0zznxhp'}>
        <IconTwitter fillColour={styles.svgIcon.fillColour} height={styles.svgIcon.height} />
      </Link>
    </View>
    <View style={styles.rowItem}>
      <Text>Save</Text>
    </View>
  </View>
);

export default SaveAndShareBar;

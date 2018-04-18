import React, { Component } from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { IconTwitter, IconDiamond } from "@times-components/icons";
import { spacing } from "@times-components/styleguide";
import styles from "./styles";

class Bubble extends Component {
  constructor() {
    super();
    this.state = {
      hover: false,
      pressed: false
    };
  }

  hover(value) {
    return () => this.setState({hover: value});
  }

  pressed(value) {
    return () => this.setState({pressed: value});
  }

  render() {
    const { hover, pressed } = this.state;
    const { onPress, Icon } = this.props;
    const fill = ["black", "white"][+pressed];
    const background = ["white", "black"][+pressed];
    console.log({pressed, hover});
    const border = hover? 3 : 1;
    
    return (
     <TouchableWithoutFeedback
        onPressIn={this.pressed(true)}
        onPressOut={this.pressed(false)}
      >
       <View 
        onMouseEnter={this.hover(true)}
        onMouseLeave={this.hover(false)} 
        style={[styles.bubble, { 
          borderWidth: border, 
          backgroundColor:background
        }]}>
      {<Icon fillColour={fill} />}
      </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default function Shavingbar({
  saved = false,
  onTweet = () => {},
  onFaceBook = () => {},
  onSave = () => {},
}) {
  return (
    <View style={styles.body}>
      <View style={styles.group}>
        <Text style={styles.text}>Share</Text>
        <Bubble
          onPress={onTweet}
          Icon={IconDiamond} />

        <Bubble
          onPress={onTweet}
          Icon={IconDiamond} />
      </View>


      <View style={styles.group}>
        <Text style={styles.text}>{
          saved ? "Saved": "Save"
        }</Text>

        <Bubble
          onPress={onTweet}
          Icon={IconDiamond} />
      </View>
    </View>
  );
}

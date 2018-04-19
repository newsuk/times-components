import React, { Component } from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { IconTwitter, IconDiamond, IconEmail, IconStar } from "@times-components/icons";
import { spacing } from "@times-components/styleguide";
import styles from "./styles";

const TouchView = ({
  onPressIn, 
  onPressOut, 
  onPress,
  onMouseEnter, 
  onMouseLeave, 
  style, 
  children
}) => ( 
  <TouchableWithoutFeedback
    onPressIn={onPressIn}
    onPress={onPress}
    onPressOut={onPressOut}>
    <View 
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave} 
      style={style}>{
      children
    }</View>
  </TouchableWithoutFeedback>
);


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
    const backgroundColor = ["white", "black"][+pressed];
    const borderColor = hover? "black" : "rgb(219, 219, 219)";
    const style = [styles.bubble, { 
      borderColor,
      backgroundColor
    }];
    
    return (
      <TouchView
        onPress={()=>{}}
        onPressIn={this.pressed(true)}
        onPressOut={this.pressed(false)}
        onMouseEnter={this.hover(true)}
        onMouseLeave={this.hover(false)}
        style={style}>
        <Icon fillColour={fill} />
      </TouchView>
    );
  }
}

export default function Shavingbar({
  saved = false,
  onEmail = () => {},
  onTweet = () => {},
  onFaceBook = () => {},
  onSave = () => {},
}) {
  return (
    <View style={styles.body}>
      <View style={styles.group}>
        <Text style={styles.text}>Share</Text>
        <Bubble
          onPress={onEmail}
          Icon={IconEmail} />
        <Bubble
          onPress={onTweet}
          Icon={IconTwitter} />
      </View>
      <View style={styles.group}>
        <Text style={styles.text}>{
          saved ? "Saved": "Save"
        }</Text>
        <Bubble
          onPress={onSave}
          Icon={IconStar} />
      </View>
    </View>
  );
}

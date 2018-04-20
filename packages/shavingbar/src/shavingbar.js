import React, { Component } from "react";
import { colours } from "@times-components/styleguide";
import PropTypes from "prop-types";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { IconTwitter, IconDiamond, IconFacebook, IconEmail, IconStar } from "@times-components/icons";
import { spacing } from "@times-components/styleguide";
import styles from "./styles";

const {primary, cancel: secondary} = colours.functional; 

class Pressable extends Component {
  constructor() {
    super();
    this.state = {
      hover: false,
      active: false
    };
  }

  hover(value) {
    return () => {
      this.setState({hover: value});
      if (value)
        this.props.onMouseEnter();
      else
        this.props.onMouseLeave();
    };
  }

  pressed(active) {
    return () => {
      this.setState({active});
      if (active)
        this.props.onMouseEnter();
      else
        this.props.onPressOut();
    };
  }

  render() {
    const { hover, active } = this.state;
    return (
      <TouchableWithoutFeedback
        onPress={this.props.onPress}
        onPressIn={this.pressed(true)}
        onPressOut={this.pressed(false)}
        onMouseEnter={this.hover(true)}
        onMouseLeave={this.hover(false)}>{
        this.props.children({active, hover}) 
      }</TouchableWithoutFeedback>
    );
  }
}

Pressable.defaultProps = {
  onPress: () => {},
  onPressIn: () => {},
  onPressOut: () => {},
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  children: PropTypes.func.isRequired
};

const Bubble = ({render, onPress}) => (
  <Pressable onPress={onPress}>{ 
    ({active, hover}) => {
      const backgroundColor = active? primary : secondary;
      const borderColor = hover ? primary : "rgb(219,219,219)";
      const style = [styles.bubble, {
        borderColor,
        backgroundColor
      }];

      return (
        <View style={style}>{
          render({active, hover}) 
        }</View>
      );
    }
  }</Pressable>
);

const Share = (Icon) => ({active}) => ( 
  <Icon 
    fillColour={active? "#fff": primary}
    strokeColour={active? primary: "#fff" }/>
);

const Star = (saved) => ({active}) => (
  <IconStar
    fillColour = { active || !saved ? "#fff" : primary }  
    strokeColour = { active ? "#fff" : primary }  
  /> 
);



export default function Shavingbar({
  saved = false,
  mailInProgress = false,
  saveInProgress = false,
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
          render={Share(IconEmail)} />
        <Bubble
          onPress={onTweet}
          render={Share(IconTwitter)}/>
        <Bubble
          onPress={onFaceBook}
          render={Share(IconFacebook)}/>
      </View>
      <View style={styles.group}>
        <Text style={styles.text}>{
          saved ? "Saved": "Save"
        }</Text>
        <Bubble
          onPress={onSave}
          render={Star(0)}/>
      </View>
    </View>
  );
}

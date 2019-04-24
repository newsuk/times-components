import React from "react";
import { View, Text, Image, Animated } from "react-native";
import styleFactory from "./styles";

class MessageBar extends React.Component {
  state = {
    yValue: new Animated.Value(0),
    timeout: null
  }

  componentDidMount() {
    Animated.spring(
      this.state.yValue,
      {
        toValue: 1,
      }
    ).start(() => {
      this.setState({
        timeout: setTimeout(() => {
          Animated.spring(
            this.state.yValue,
            {
              toValue: 0
            }
          ).start()
        }, 3000)
      })
    })
  }

  render() {
    const { scale, message } = this.props;
    const { yValue } = this.state;
    const styles = styleFactory(scale);

    return (<Animated.View style={{
      transform: [{
        translateY: yValue.interpolate({
          inputRange: [0, 1],
          outputRange: [-50, 0]
        })
      }]
    }}>
      <View style={styles.MessageBarBody}>
        <Text style={styles.MessageBarText}>
          {message}
        </Text>
        <View style={styles.MessageBarCloseButton}>
          <Image
            resizeMode="contain"
            source={require("../assets/close-button.png")}
          />
        </View>
      </View>
    </Animated.View>)
  }
}

export default MessageBar;

import "react-native";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { storiesOf } from "@storybook/react-native";
import { action } from "@storybook/addon-actions";
import { number } from "@storybook/addon-knobs";
import Shavingbar from "./src";

class InteractiveShavingbar extends Component {
  constructor() {
    super();
    this.state = {
      isSaving: false,
      isSharing: false,
      isSaved: false
    };
  }

  handleAction(name) {
    const notification = action(name);
    const toggle = name === "isSaving";
    const { isSaved } = this.state;
    return () => {
      this.setState({ [name]: true });
      if (this.state[name]) {
        notification("debounce");
        return;
      }

      notification("inProgress");
      setTimeout(() => {
        notification("send");
        this.setState({
          [name]: false,
          isSaved: toggle ? !isSaved : isSaved
        });
      }, this.props.shavingTime * 100);
    };
  }

  render() {
    const { isSaved, isSaving, isSharing } = this.state;
    return (
      <Shavingbar
        isSaved={isSaved}
        isSharing={isSharing}
        isSaving={isSaving}
        onEmail={this.handleAction("isSharing")}
        onSave={this.handleAction("isSaving")}
        onTwitter={action("onTwitter")}
        onFacebook={action("onFacebook")}
      />
    );
  }
}

InteractiveShavingbar.propTypes = {
  shavingTime: PropTypes.number.isRequired
};

storiesOf("Composed/Shavingbar", module).add("Shavingbar", () => (
  <InteractiveShavingbar
    shavingTime={number("shavingTime", 10, {
      range: true,
      min: 0,
      max: 100,
      step: 1
    })}
  />
));

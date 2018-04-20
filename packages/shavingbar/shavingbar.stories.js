import "react-native";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { storiesOf } from "@storybook/react-native";
import { action } from "@storybook/addon-actions";
import { number } from "@storybook/addon-knobs";
import { withTrackingContext } from "@times-components/tracking";
import Shavingbar from "./";

class InteractiveShavingbar extends Component {
  constructor() {
    super();
    this.state = {
      saving : false,
      sharing : false
    };
  }

  handleAction(name) {
    const notification = action(name);
    return () => {
      this.setState({[name]: true});
      if (this.state[name]) {
        return notification("debounce");
      }

      notification("inProgress");
      setTimeout(() => {
        this.setState({[name]: false});
        notification('send');
      }, this.props.shavingTime * 100);
    }
  }

  render() {
    const {saving, sharing} = this.state;
    return (
      <Shavingbar 
        emailInProgress={sharing}
        savingInProgress={saving}
        onEmail={this.handleAction("sharing")}
        onSave={this.handleAction("saving")}
        onTwitter={action("onTwitter")}
        onFacebook={action("onFacebook")} />
    );
  }
}

InteractiveShavingbar.propTypes = {
  shavingTime: PropTypes.number.isRequired
};


storiesOf("Composed/Shavingbar", module).add("Shavingbar", () => (
  <InteractiveShavingbar shavingTime={number("shavingTime", 10, {
    range: true,
    min: 0,
    max: 100,
    step: 1
  })}/>
));

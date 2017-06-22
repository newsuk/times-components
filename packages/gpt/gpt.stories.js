import "react-native";
import React, { Component } from "react";
import { storiesOf } from "@storybook/react-native";

import AdManager from './ad-manager';
import GPT from "./gpt.web";

class Wrapper extends Component {

  constructor (props) {
    super(props);
    this.adManager = new AdManager({
      networkId: '25436805',
      adUnit: 'd.thetimes.co.uk',
      section: 'home'
    });
  }

  componentDidMount () {
    this.adManager.init(() => {
      this.adManager.display();
    });
  }

  render() {
    return (
      <div>
        <GPT adManager={this.adManager} code='ad-header' />
      </div>
    );
  }
}

storiesOf("GPT", module).add("GPT", () => {
  return (<Wrapper />);
});

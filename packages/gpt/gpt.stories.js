import "react-native";
import React, { Component } from "react";
import { storiesOf } from "@storybook/react-native";

import AdManager from './ad-manager';
import GPT from "./gpt.web";

class Wrapper extends Component {

  componentDidMount () {
    console.log('Component did mount wrapper')
    this.props.adManager.init(() => {
      this.props.adManager.display();
    });
  }

  render() {
    return (
      <div>
        <GPT code='ad-header' adManager={this.props.adManager} />
      </div>
    );
  }
}

storiesOf("GPT", module).add("GPT", () => {
  const adManager = new AdManager({
    networkId: '25436805',
    adUnit: 'd.thetimes.co.uk',
    section: 'article'
  });

  return (<Wrapper adManager={adManager} />);
});

import React, { Component } from "react";
import { storiesOf } from "@storybook/react-native";

import AdManager from "./ad-manager";
import GPT from "./gpt.web";

class Wrapper extends Component {
  constructor(props) {
    super(props);
    this.adManager = new AdManager({
      networkId: "25436805",
      adUnit: "d.thetimes.co.uk",
      section: "article"
    });
  }

  componentDidMount() {
    this.adManager.init(() => {
      this.adManager.display();
    });
  }

  render() {
    return (
      <div>
        <a
          href={`/iframe.html${window.document.location.search}`}
          target="_parent"
        >
          Render ad
        </a>
        <GPT adManager={this.adManager} code="ad-header" />
      </div>
    );
  }
}

storiesOf("GPT", module).add("GPT", () => {
  return <Wrapper />;
});

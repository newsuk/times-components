import React, { Component } from "react";
import AdContainer from './ad-container';
import { InlineAdWrapper } from "./styles/responsive";

class AdWrapper extends Component {
  constructor(props) {
    super(props);
    const { slotName } = props;

    this.state = {
      adRendered: false,
      slotName: slotName
    };
  }

  handleAdLoad = (event) => {
    // console.log('event listener 1 ', {event, slotname: this.state.slotName});
    if (event.detail.name === this.state.slotName) {
      console.log('event listener 2 ');
      this.setState({ adRendered: true });
    }
  };

  componentDidMount() {
    console.log('componentdidmount here ');
    window.addEventListener('nukAdLibSlotsRendered', this.handleAdLoad);
  }

  componentWillUnmount() {
    window.removeEventListener('nukAdLibSlotsRendered', this.handleAdLoad)
  }

  render() {
    const { adRendered, slotName } = this.state;
    if (adRendered) {
      // console.log('ad rendered 1', adRendered);
      return (
        <InlineAdWrapper>
          <AdContainer slotName={slotName} />
        </InlineAdWrapper>
      )
    } else {
      // console.log('ad rendered else 2', adRendered);
      return (
        <div id='test'>
          should not work for ads
          <AdContainer slotName={slotName} />
        </div>
      )
    }
  }
}

export default AdWrapper;

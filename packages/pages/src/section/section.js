import React, { Component } from "react";
import { AppState, NativeModules } from "react-native";
import PropTypes from "prop-types";
import { SectionContext } from "@times-components/context";
import Section from "@times-components/section";
import trackSection from "./track-section";

const {
  getOpenedPuzzleCount,
  onArticlePress,
  onPuzzleBarPress = () => {},
  onPuzzlePress
} = NativeModules.SectionEvents || {
  onArticlePress: () => {},
  onPuzzleBarPress: () => {},
  onPuzzlePress: () => {}
};

class SectionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recentlyOpenedPuzzleCount: props ? props.recentlyOpenedPuzzleCount : 0
    };
    this.onAppStateChange = this.onAppStateChange.bind(this);
  }

  componentDidMount() {
    AppState.addEventListener("change", this.onAppStateChange);
    this.updatePuzzleCount();
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this.onAppStateChange);
  }

  onAppStateChange(nextAppState) {
    if (nextAppState === "active") {
      this.updatePuzzleCount();
    }
  }

  updatePuzzleCount() {
    const {
      section: { name }
    } = this.props;
    if (name === "PuzzleSection" && getOpenedPuzzleCount) {
      getOpenedPuzzleCount().then(count => {
        this.setState({ recentlyOpenedPuzzleCount: count });
      });
    }
  }

  render() {
    const { publicationName, section } = this.props;
    const { recentlyOpenedPuzzleCount } = this.state;
    return (
      <SectionContext.Provider
        value={{ publicationName, recentlyOpenedPuzzleCount }}
      >
        <Section
          analyticsStream={trackSection}
          onArticlePress={({ id, url }) => onArticlePress(url, id)}
          onPuzzleBarPress={onPuzzleBarPress}
          onPuzzlePress={({ id, title, url }) => onPuzzlePress(url, title, id)}
          section={section}
        />
      </SectionContext.Provider>
    );
  }
}

SectionPage.propTypes = {
  publicationName: PropTypes.string,
  recentlyOpenedPuzzleCount: PropTypes.number,
  section: PropTypes.shape({})
};

SectionPage.defaultProps = {
  publicationName: "TIMES",
  recentlyOpenedPuzzleCount: 0,
  section: null
};

export default SectionPage;

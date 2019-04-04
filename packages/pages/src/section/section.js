import React, { Component } from "react";
import { AppState, DeviceEventEmitter, NativeModules } from "react-native";
import PropTypes from "prop-types";
import { SectionContext } from "@times-components/context";
import Section from "@times-components/section";
import trackSection from "./track-section";

const {
  getOpenedPuzzleCount,
  getSavedArticles,
  onArticlePress,
  onPuzzleBarPress = () => {},
  onPuzzlePress,
  onArticleSavePress
} = NativeModules.SectionEvents || {
  onArticlePress: () => {},
  onPuzzleBarPress: () => {},
  onPuzzlePress: () => {}
};

class SectionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recentlyOpenedPuzzleCount: props ? props.recentlyOpenedPuzzleCount : 0,
      savedArticles: null
    };
    this.onAppStateChange = this.onAppStateChange.bind(this);
    this.toggleArticleSaveStatus = this.toggleArticleSaveStatus.bind(this);
  }

  componentDidMount() {
    AppState.addEventListener("change", this.onAppStateChange);
    DeviceEventEmitter.addListener("updateSavedArticles", this.syncAppData);
    this.syncAppData();
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this.onAppStateChange);
    DeviceEventEmitter.removeAllListeners("updateSavedArticles");
  }

  onAppStateChange(nextAppState) {
    if (nextAppState === "active") {
      this.syncAppData();
    }
  }

  syncAppData() {
    const {
      section: { name }
    } = this.props;
    if (name === "PuzzleSection" && getOpenedPuzzleCount) {
      getOpenedPuzzleCount().then(count => {
        this.setState({ recentlyOpenedPuzzleCount: count });
      });
    }

    if (getSavedArticles) {
      getSavedArticles().then(articleIds => {
        const savedArticles = articleIds ? {} : null;
        articleIds.forEach(id => {
          savedArticles[id] = true;
        });

        this.setState({
          savedArticles
        });
      });
    }
  }

  toggleArticleSaveStatus(save, articleId) {
    const { savedArticles } = this.state;
    savedArticles[articleId] = save || undefined;
    this.setState({ savedArticles });
  }

  render() {
    const { publicationName, section } = this.props;
    const { recentlyOpenedPuzzleCount, savedArticles } = this.state;

    return (
      <SectionContext.Provider
        value={{
          onArticleSavePress: onArticleSavePress
            ? (save, articleId) => {
                this.toggleArticleSaveStatus(save, articleId);

                onArticleSavePress(save, articleId).catch(() => {
                  this.toggleArticleSaveStatus(!save, articleId);
                });
              }
            : null,
          publicationName,
          recentlyOpenedPuzzleCount,
          savedArticles
        }}
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

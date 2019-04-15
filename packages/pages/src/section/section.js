import React, { Component } from "react";
import { AppState, DeviceEventEmitter, NativeModules } from "react-native";
import PropTypes from "prop-types";
import { SectionContext } from "@times-components/context";
import Section from "@times-components/section";
import trackSection from "./track-section";

const {
  getOpenedPuzzleCount,
  getSavedArticles,
  getSectionData,
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
    const { section } = this.props;
    this.state = {
      recentlyOpenedPuzzleCount: props ? props.recentlyOpenedPuzzleCount : 0,
      savedArticles: null,
      section
    };
    this.onAppStateChange = this.onAppStateChange.bind(this);
    this.toggleArticleSaveStatus = this.toggleArticleSaveStatus.bind(this);
    this.syncAppData = this.syncAppData.bind(this);
    this.updateSectionData = this.updateSectionData.bind(this);
  }

  componentDidMount() {
    AppState.addEventListener("change", this.onAppStateChange);
    DeviceEventEmitter.addListener("updateSavedArticles", this.syncAppData);
    DeviceEventEmitter.addListener("updateSectionData", this.updateSectionData);
    this.syncAppData();
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this.onAppStateChange);
    DeviceEventEmitter.removeListener("updateSavedArticles", this.syncAppData);
    DeviceEventEmitter.removeListener(
      "updateSectionData",
      this.updateSectionData
    );
  }

  onAppStateChange(nextAppState) {
    if (nextAppState === "active") {
      this.syncAppData();
    }
  }

  syncAppData() {
    const {
      section: { name }
    } = this.state;
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

  updateSectionData() {
    const {
      section: { id }
    } = this.props;
    if (getSectionData) {
      getSectionData(id).then(data => {
        this.setState({ section: data });
      });
    }
  }

  toggleArticleSaveStatus(save, articleId) {
    const { savedArticles } = this.state;
    savedArticles[articleId] = save || undefined;
    this.setState({ savedArticles });
  }

  render() {
    const { publicationName } = this.props;
    const { recentlyOpenedPuzzleCount, savedArticles, section } = this.state;

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

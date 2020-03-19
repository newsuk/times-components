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
  onArticlePress: onArticlePressBridge,
  onPuzzleBarPress = () => {},
  onPuzzlePress: onPuzzlePressBridge,
  onArticleSavePress: onArticleSavePressBridge
} = NativeModules.SectionEvents || {
  onArticlePress: () => {},
  onPuzzleBarPress: () => {},
  onPuzzlePress: () => {}
};

const onArticlePress = ({ id, url }) => onArticlePressBridge(url, id);
const onPuzzlePress = ({ id, title, url }) =>
  onPuzzlePressBridge(url, title, id);

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
    this.onArticleSavePress = this.onArticleSavePress.bind(this);
    this.isSyncing = false;
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

  onArticleSavePress(save, articleId) {
    this.toggleArticleSaveStatus(save, articleId);

    onArticleSavePressBridge(save, articleId).catch(() => {
      this.toggleArticleSaveStatus(!save, articleId);
    });
  }

  async syncAppData() {
    const {
      section: { name }
    } = this.state;

    if (this.isSyncing) {
      return;
    }

    this.isSyncing = true;

    try {
      if (name === "PuzzleSection" && getOpenedPuzzleCount) {
        const count = await getOpenedPuzzleCount();

        this.setState({ recentlyOpenedPuzzleCount: count });
      }

      if (getSavedArticles) {
        const articleIds = await getSavedArticles();
        const savedArticles = !articleIds
          ? null
          : articleIds.reduce((saved, id) => {
              // eslint-disable-next-line no-param-reassign
              saved[id] = true;

              return saved;
            }, {});

        this.setState({
          savedArticles
        });
      }
    } finally {
      this.isSyncing = false;
    }
  }

  updateSectionData() {
    const {
      section: { id }
    } = this.props;
    if (getSectionData) {
      getSectionData(id).then(data => {
        this.setState({ section: JSON.parse(data) });
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
          onArticleSavePress: onArticleSavePressBridge
            ? this.onArticleSavePress
            : null,
          publicationName,
          recentlyOpenedPuzzleCount,
          savedArticles
        }}
      >
        <Section
          analyticsStream={trackSection}
          onArticlePress={onArticlePress}
          onPuzzleBarPress={onPuzzleBarPress}
          onPuzzlePress={onPuzzlePress}
          section={section}
          publicationName={publicationName}
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

import React, { Component } from "react";
import { FlatList, View } from "react-native";
import PropTypes from "prop-types";
import Context from "@times-components/context";
import Responsive from "@times-components/responsive";
import { withTrackScrollDepth } from "@times-components/tracking";
import SectionItemSeparator from "./section-item-separator";
import withTrackingContext from "./section-tracking-context";
import Slice from "./slice";
import styles from "./styles";
import { splitPuzzlesBySlices, buildSliceData } from "./utils";

class Section extends Component {
  constructor(props) {
    super(props);
    this.onViewableItemsChanged = this.onViewableItemsChanged.bind(this);
  }

  onViewableItemsChanged(info) {
    const {
      onViewed,
      section: { slices }
    } = this.props;
    if (!info.changed.length) return [];

    return info.changed
      .filter(viewableItem => viewableItem.isViewable)
      .map(viewableItem => onViewed(viewableItem.item, slices));
  }

  render() {
    const {
      onArticlePress,
      onPuzzlePress,
      publicationName,
      section: { name, slices },
      onViewed,
      receiveChildList
    } = this.props;
    const isPuzzle = name === "PuzzleSection";
    const data = isPuzzle
      ? buildSliceData(splitPuzzlesBySlices(slices))
      : buildSliceData(slices);

    if (slices) receiveChildList(data);

    return (
      <Responsive>
        <FlatList
          data={data}
          ItemSeparatorComponent={
            !isPuzzle &&
            (() => (
              <View style={styles.listItemSeparatorContainer}>
                <SectionItemSeparator />
              </View>
            ))
          }
          keyExtractor={item => item.elementId}
          onViewableItemsChanged={onViewed ? this.onViewableItemsChanged : null}
          renderItem={({ index, item: slice }) => (
            <Context.Provider value={{ publicationName }}>
              <Slice
                index={index}
                length={slices.length}
                onPress={isPuzzle ? onPuzzlePress : onArticlePress}
                slice={slice}
              />
            </Context.Provider>
          )}
          viewabilityConfig={{
            viewAreaCoveragePercentThreshold: 10,
            waitForInteraction: false
          }}
        />
      </Responsive>
    );
  }
}

Section.propTypes = {
  onArticlePress: PropTypes.func,
  onPuzzlePress: PropTypes.func,
  onViewed: PropTypes.func,
  publicationName: PropTypes.string.isRequired,
  receiveChildList: PropTypes.func,
  section: PropTypes.shape({}).isRequired
};

Section.defaultProps = {
  onArticlePress: () => {},
  onPuzzlePress: () => {},
  onViewed: () => {},
  receiveChildList: () => {}
};

export default withTrackingContext(withTrackScrollDepth(Section));

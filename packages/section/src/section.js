import React, { Component } from "react";
import { FlatList, View } from "react-native";
import PropTypes from "prop-types";
import Responsive from "@times-components/responsive";
import { withTrackScrollDepth } from "@times-components/tracking";
import SectionItemSeparator from "./section-item-separator";
import withTrackingContext from "./section-tracking-context";
import PuzzleBar from "./puzzle-bar";
import Slice from "./slice";
import styles from "./styles";
import { splitPuzzlesBySlices, buildSliceData } from "./utils";

class Section extends Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
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

  renderItem({ index, item: slice }) {
    const {
      onArticlePress,
      onPuzzlePress,
      section: { name, slices }
    } = this.props;
    const isPuzzle = name === "PuzzleSection";

    return (
      <Slice
        index={index}
        length={slices.length}
        onPress={isPuzzle ? onPuzzlePress : onArticlePress}
        slice={slice}
      />
    );
  }

  render() {
    const {
      onPuzzleBarPress,
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
          ListHeaderComponent={
            isPuzzle ? <PuzzleBar onPress={onPuzzleBarPress} /> : null
          }
          onViewableItemsChanged={onViewed ? this.onViewableItemsChanged : null}
          renderItem={this.renderItem}
        />
      </Responsive>
    );
  }
}

Section.propTypes = {
  onArticlePress: PropTypes.func,
  onPuzzleBarPress: PropTypes.func,
  onPuzzlePress: PropTypes.func,
  onViewed: PropTypes.func,
  receiveChildList: PropTypes.func,
  section: PropTypes.shape({}).isRequired
};

Section.defaultProps = {
  onArticlePress: () => {},
  onPuzzleBarPress: () => {},
  onPuzzlePress: () => {},
  onViewed: () => {},
  receiveChildList: () => {}
};

export default withTrackingContext(withTrackScrollDepth(Section));

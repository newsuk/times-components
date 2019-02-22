import React, { Component } from "react";
import { FlatList, View } from "react-native";
import PropTypes from "prop-types";
import Responsive from "@times-components/responsive";
import { withTrackScrollDepth } from "@times-components/tracking";
import SectionItemSeparator from "./section-item-separator";
import withTrackingContext from "./section-tracking-context";
import Slice from "./slice";
import styles from "./styles";

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
      onPress,
      section: { slices, title },
      onViewed,
      receiveChildList
    } = this.props;

    const showSeparator = title !== "Puzzles";

    const data = slices.map((slice, index) => ({
      ...slice,
      elementId: `${slice.id}.${index}`
    }));
    if (slices) receiveChildList(data);

    return (
      <Responsive>
        <FlatList
          data={data}
          ItemSeparatorComponent={
            showSeparator &&
            (() => (
              <View style={styles.listItemSeparatorContainer}>
                <SectionItemSeparator />
              </View>
            ))
          }
          onViewableItemsChanged={onViewed ? this.onViewableItemsChanged : null}
          renderItem={({ index, item: slice }) => (
            <Slice
              index={index}
              length={slices.length}
              onPress={onPress}
              slice={slice}
            />
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
  onPress: PropTypes.func,
  onViewed: PropTypes.func,
  receiveChildList: PropTypes.func,
  section: PropTypes.shape({}).isRequired
};

Section.defaultProps = {
  onPress: () => {},
  onViewed: () => {},
  receiveChildList: () => {}
};

export default withTrackingContext(withTrackScrollDepth(Section));

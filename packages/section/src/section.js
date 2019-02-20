import React from "react";
import { FlatList, View } from "react-native";
import PropTypes from "prop-types";
import Responsive from "@times-components/responsive";
import SectionItemSeparator from "./section-item-separator";
import withTrackingContext from "./section-tracking-context";
import Slice from "./slice";
import styles from "./styles";

const Section = ({ onPress, section: { slices, title } }) => {
  const showSeparator = title !== "Puzzles";
  return (
    <Responsive>
      <FlatList
        data={slices}
        ItemSeparatorComponent={
          showSeparator &&
          (() => (
            <View style={styles.listItemSeparatorContainer}>
              <SectionItemSeparator />
            </View>
          ))
        }
        renderItem={({ index, item: slice }) => (
          <Slice
            index={index}
            length={slices.length}
            onPress={onPress}
            slice={slice}
          />
        )}
      />
    </Responsive>
  );
};

Section.propTypes = {
  onPress: PropTypes.func,
  section: PropTypes.shape({}).isRequired
};

Section.defaultProps = {
  onPress: () => {}
};

export default withTrackingContext(Section);

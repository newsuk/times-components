import React from "react";
import { FlatList, View } from "react-native";
import PropTypes from "prop-types";
import {
  LeadOneAndFourSlice,
  LeadOneAndOneSlice,
  LeadOneFullWidthSlice,
  LeadTwoNoPicAndTwoSlice,
  ListTwoAndSixNoPicSlice,
  SecondaryOneSlice,
  SecondaryFourSlice
} from "@times-components/edition-slices";
import SectionItemSeparator from "./section-item-separator";
import styles from "./styles";

const renderSlice = (slice, onPress) => {
  switch (slice.name) {
    case "LeadOneAndFourSlice":
      return (
        <LeadOneAndFourSlice
          lead={slice.lead}
          onPress={onPress}
          support1={slice.support1}
          support2={slice.support2}
          support3={slice.support3}
          support4={slice.support4}
        />
      );
    case "LeadOneFullWidthSlice":
      return <LeadOneFullWidthSlice lead={slice.lead} onPress={onPress} />;
    case "LeadOneAndOneSlice":
      return (
        <LeadOneAndOneSlice
          lead={slice.lead}
          onPress={onPress}
          support={slice.support}
        />
      );
    case "LeadTwoNoPicAndTwoSlice":
      return (
        <LeadTwoNoPicAndTwoSlice
          lead1={slice.lead1}
          lead2={slice.lead2}
          onPress={onPress}
          support1={slice.support1}
          support2={slice.support2}
        />
      );
    case "SecondaryOneSlice":
      return (
        <SecondaryOneSlice onPress={onPress} secondary={slice.secondary} />
      );
    case "SecondaryFourSlice":
      return (
        <SecondaryFourSlice
          onPress={onPress}
          secondary1={slice.secondary1}
          secondary2={slice.secondary2}
          secondary3={slice.secondary3}
          secondary4={slice.secondary4}
        />
      );
    case "ListTwoAndSixNoPicSlice":
      return (
        <ListTwoAndSixNoPicSlice
          onPress={onPress}
          secondary1={slice.secondary1}
          secondary2={slice.secondary2}
          support1={slice.secondary3}
          support2={slice.secondary4}
        />
      );
    default:
      return null;
  }
};
const Section = ({ onPress, section: { slices } }) => (
  <FlatList
    data={slices}
    ItemSeparatorComponent={() => (
      <View style={styles.listItemSeparatorContainer}>
        <SectionItemSeparator />
      </View>
    )}
    renderItem={({ item: slice }) => renderSlice(slice, onPress)}
  />
);

Section.propTypes = {
  onPress: PropTypes.func,
  section: PropTypes.shape({}).isRequired
};

Section.defaultProps = {
  onPress: () => {}
};
export default Section;

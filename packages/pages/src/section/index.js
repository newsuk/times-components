import React from "react";
import { ActivityIndicator, Text } from "react-native";
import PropTypes from "prop-types";
import { EditionProvider } from "@times-components/provider";
import Section from "./section";
import withNativeProvider from "../with-native-provider";

const onPress = () => {};
const SectionPage = ({ editionId, section }) => {
  const SectionPageView = withNativeProvider(
    <EditionProvider debounceTimeMs={0} id={editionId}>
      {({ edition, error, isLoading }) => {
        if (isLoading) {
          return <ActivityIndicator size="large" />;
        }
        if (error) {
          return <Text>{error}</Text>;
        }
        return edition.sections
          .filter(({ title }) => title === section)
          .map(({ slices }) => <Section onPress={onPress} slices={slices} />);
      }}
    </EditionProvider>
  );
  return <SectionPageView />;
};

SectionPage.propTypes = {
  editionId: PropTypes.string.isRequired,
  section: PropTypes.string.isRequired
};

export default SectionPage;

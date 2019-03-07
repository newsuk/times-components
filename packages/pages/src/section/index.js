import React from "react";
import { ActivityIndicator, NativeModules, Text } from "react-native";
import PropTypes from "prop-types";
import { EditionProvider } from "@times-components/provider";
import Section from "@times-components/section";
import withNativeProvider from "../with-native-provider";

const { onArticlePress, onPuzzlePress } = NativeModules.SectionEvents || {
  onArticlePress: () => {},
  onPuzzlePress: () => {}
};

const track = () => {};
const SectionPage = ({ editionId, publicationName, section, sectionTitle }) => {
  const SectionPageView = withNativeProvider(
    section ? (
      <Section
        analyticsStream={track}
        onArticlePress={(_, { url }) => onArticlePress(url)}
        onPuzzlePress={(_, { url }) => onPuzzlePress(url)}
        publicationName={publicationName}
        section={JSON.parse(section)}
      />
    ) : (
      <EditionProvider debounceTimeMs={0} id={editionId}>
        {({ edition, error, isLoading }) => {
          if (isLoading) {
            return <ActivityIndicator size="large" />;
          }
          if (error) {
            return <Text>{JSON.stringify(error)}</Text>;
          }
          const { publicationName: pubName } = edition;
          return edition.sections
            .filter(({ title }) => title === sectionTitle)
            .map(sectionData => (
              <Section
                analyticsStream={track}
                onArticlePress={(_, { url }) => onArticlePress(url)}
                onPuzzlePress={(_, { url }) => onPuzzlePress(url)}
                publicationName={pubName}
                section={sectionData}
              />
            ));
        }}
      </EditionProvider>
    )
  );
  return <SectionPageView />;
};

SectionPage.propTypes = {
  editionId: PropTypes.string,
  publicationName: PropTypes.string,
  section: PropTypes.shape({}),
  sectionTitle: PropTypes.string
};

SectionPage.defaultProps = {
  editionId: null,
  publicationName: "TIMES",
  section: null,
  sectionTitle: null
};

export default SectionPage;

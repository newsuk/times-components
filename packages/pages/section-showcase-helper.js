import React from "react";
import { ActivityIndicator, Text } from "react-native";
import PropTypes from "prop-types";
import { EditionProvider } from "@times-components/provider";
import withNativeProvider from "./src/with-native-provider";
import Section from "./src/section/section";

const SectionPage = ({ editionId, sectionTitle }) => {
  const SectionPageView = withNativeProvider(
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
            <Section publicationName={pubName} section={sectionData} />
          ));
      }}
    </EditionProvider>
  );

  return <SectionPageView />;
};

SectionPage.propTypes = {
  editionId: PropTypes.string.isRequired,
  sectionTitle: PropTypes.string.isRequired
};

export default SectionPage;

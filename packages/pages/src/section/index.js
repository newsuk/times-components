import React from "react";
import { ActivityIndicator, Text } from "react-native";
import PropTypes from "prop-types";
import { EditionProvider } from "@times-components/provider";
import Section from "@times-components/section";
import withNativeProvider from "../with-native-provider";

const onPress = () => {};
const track = () => {};
const SectionPage = ({ editionId, section, sectionTitle }) => {
  const SectionPageView = withNativeProvider(
    section ? (
      <Section
        analyticsStream={track}
        onPress={onPress}
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
          const { publicationName } = edition;
          return edition.sections
            .filter(({ title }) => title === sectionTitle)
            .map(sectionData => (
              <Section
                analyticsStream={track}
                onPress={onPress}
                publicationName={publicationName}
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
  section: PropTypes.shape({}),
  sectionTitle: PropTypes.string
};

SectionPage.defaultProps = {
  editionId: null,
  section: null,
  sectionTitle: null
};

export default SectionPage;

import React from "react";
import { ActivityIndicator, Text } from "react-native";
import PropTypes from "prop-types";
import { EditionProvider } from "@times-components/provider";
import Section from "@times-components/section";
import withNativeProvider from "../with-native-provider";

const onPress = () => {};
const track = () => {};
const SectionPage = ({ editionId, publicationName, section, sectionTitle }) => {
  console.time("sectionParse");
  const t0 = performance.now();
  const parsedSection = JSON.parse(section);
  const t1 = performance.now();
  console.timeEnd("sectionParse");
  console.log("sectionParse with len:", section.length, t1 - t0);
  const SectionPageView = withNativeProvider(
    section ? (
      <Section
        analyticsStream={track}
        onPress={onPress}
        publicationName={publicationName}
        section={parsedSection}
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
                onPress={onPress}
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

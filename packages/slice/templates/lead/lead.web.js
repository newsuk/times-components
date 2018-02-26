import React from "react";
import { propTypes, defaultProps } from "./proptypes";
import { getSeparator, SliceContainer } from "../shared.responsive";
import {
  getContainer,
  getLeadContainer,
  getSectionContainer,
  SectionsContainer
} from "./responsive";

const LeadSlice = ({ lead, sections }) => {
  const hasSections = sections.length > 0;
  const Container = getContainer({ hasSections });
  const LeadContainer = getLeadContainer({ hasSections });
  const Separator = getSeparator({ withMargin: false });

  // for tests
  Container.displayName = "Container";
  LeadContainer.displayName = "LeadContainer";
  Separator.displayName = "Separator";

  return (
    <SliceContainer>
      <Container>
        <LeadContainer>{lead()}</LeadContainer>
        {hasSections && <Separator />}
        {hasSections && (
          <SectionsContainer>
            {sections.map((section, index) => {
              const SectionContainer = getSectionContainer(index);
              SectionContainer.displayName = "SectionContainer";
              return (
                <SectionContainer key={`section-container-${section.key}`}>
                  {section}
                </SectionContainer>
              );
            })}
          </SectionsContainer>
        )}
      </Container>
    </SliceContainer>
  );
};

LeadSlice.propTypes = propTypes;
LeadSlice.defaultProps = defaultProps;

export default LeadSlice;

import React from "react";
import { propTypes, defaultProps } from "./proptypes";
import { getSeparator, SliceContainer } from "../shared.responsive";
import {
  getContainer,
  getLeadContainer,
  getSupportContainer,
  SupportsContainer
} from "./responsive";

const LeadSlice = ({ lead, support1, support2 }) => {
  const supports = [support1, support2].filter(support => support !== null);
  const supportCount = supports.length;
  const hasSupports = supportCount > 0;
  const Container = getContainer({ hasSupports });
  const LeadContainer = getLeadContainer({ hasSupports, supportCount });
  const Separator = getSeparator({ hasLeftRightMargin: false });

  return (
    <SliceContainer>
      <Container>
        <LeadContainer>{lead}</LeadContainer>
        {hasSupports && <Separator />}
        {hasSupports && (
          <SupportsContainer>
            {supports.map((support, index) => {
              const SupportContainer = getSupportContainer({ index });
              SupportContainer.displayName = "SupportContainer";
              return (
                <SupportContainer key={`support-container-${support.key}`}>
                  {support}
                </SupportContainer>
              );
            })}
          </SupportsContainer>
        )}
      </Container>
    </SliceContainer>
  );
};

LeadSlice.propTypes = propTypes;
LeadSlice.defaultProps = defaultProps;

export default LeadSlice;

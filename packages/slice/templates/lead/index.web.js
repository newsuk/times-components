import React from "react";
import { propTypes, defaultProps } from "./proptypes";
import { getSeparator, SliceContainer } from "../shared.responsive";
import {
  getContainer,
  getLeadContainer,
  getSupportContainer,
  SupportsContainer
} from "./responsive";
import { leadConfig, supportConfig, getConfigWrapper } from "./config";

const LeadSlice = ({ lead, support1, support2 }) => {
  const supports = [support1(supportConfig), support2(supportConfig)].filter(
    support => support !== null
  );
  const supportCount = supports.length;
  const hasSupports = supportCount > 0;
  const ConfigWrapper = getConfigWrapper({ supportCount });
  const Container = getContainer({ hasSupports });
  const LeadContainer = getLeadContainer({ hasSupports, supportCount });
  const Separator = getSeparator({ hasLeftRightMargin: false });

  return (
    <ConfigWrapper>
      <SliceContainer>
        <Container>
          <LeadContainer>{lead(leadConfig)}</LeadContainer>
          {hasSupports && <Separator />}
          {hasSupports && (
            <SupportsContainer>
              {supports.map((support, index) => {
                const SupportContainer = getSupportContainer({ index });
                SupportContainer.displayName = "SupportContainer";
                return (
                  <SupportContainer key={`support-container-${support[0].key}`}>
                    {support[0]}
                  </SupportContainer>
                );
              })}
            </SupportsContainer>
          )}
        </Container>
      </SliceContainer>
    </ConfigWrapper>
  );
};

LeadSlice.propTypes = propTypes;
LeadSlice.defaultProps = defaultProps;

export default LeadSlice;

import React from "react";
import { propTypes, defaultProps } from "./proptypes";
import { getSeparator, SliceContainer } from "../styles/responsive";
import {
  getContainer,
  getLeadContainer,
  getSupportContainer,
  SupportsContainer
} from "./responsive";
import { getLeadConfig, getSupportConfig, getConfigWrapper } from "./config";

const LeadAndTwoSlice = ({ lead, renderSupports }) => {
  const supportConfig = getSupportConfig();
  const supports = renderSupports(supportConfig);
  const supportCount = supports.length;
  const itemCount = supportCount + 1;
  const hasSupports = supportCount > 0;
  const ConfigWrapper = getConfigWrapper({ supportCount });
  const Container = getContainer({ hasSupports });
  const LeadContainer = getLeadContainer({
    hasSupports,
    supportCount
  });
  const Separator = getSeparator({ hasLeftRightMargin: false, itemCount: 0 });

  const leadConfig = getLeadConfig(itemCount);

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
                  <SupportContainer key={support.props.id}>
                    {support}
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

LeadAndTwoSlice.propTypes = propTypes;
LeadAndTwoSlice.defaultProps = defaultProps;

export default LeadAndTwoSlice;

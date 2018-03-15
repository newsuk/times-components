import React from "react";
import { propTypes, defaultProps } from "./proptypes";
import { getSeparator, SliceContainer } from "../styles/responsive";
import {
  getContainer,
  getLeadAndTwoContainer,
  getSupportContainer,
  SupportsContainer
} from "./responsive";
import {
  leadAndTwoConfig,
  supportConfig,
  getConfigWrapper,
  summaryConfig
} from "./config";

const LeadAndTwoSlice = ({ lead, support1, support2 }) => {

  const supports = [support1(supportConfig), support2(supportConfig)].filter(
    support => support !== null
  );
  const supportCount = supports.length;
  const itemCount = supportCount + 1;
  const hasSupports = supportCount > 0;
  const ConfigWrapper = getConfigWrapper({ supportCount });
  const Container = getContainer({ hasSupports });
  const LeadAndTwoContainer = getLeadAndTwoContainer({
    hasSupports,
    supportCount
  });
  const Separator = getSeparator({ hasLeftRightMargin: false });

  const config = {
    ...leadAndTwoConfig,
    summaryConfig: summaryConfig[itemCount]
  };

  console.log(config);
  return (
    <ConfigWrapper>
      <SliceContainer>
        <Container>
          <LeadAndTwoContainer>{lead(config)}</LeadAndTwoContainer>
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

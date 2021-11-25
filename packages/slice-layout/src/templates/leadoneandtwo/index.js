import React from "react";
import PropTypes from "prop-types";
import { getSeparator, SliceContainer } from "../styles/responsive";
import {
  getContainer,
  getLeadContainer,
  getSupportContainer,
  SupportsContainer
} from "./responsive";
import { getLeadConfig, getSupportConfig, getConfigWrapper } from "./config";

const supportConfig = getSupportConfig();
const Separator = getSeparator({ hasLeftRightMargin: false });

const LeadOneAndTwoSlice = ({ renderLead, renderSupport1, renderSupport2 }) => {
  const supports = [
    renderSupport1(supportConfig),
    renderSupport2(supportConfig)
  ].filter(support => support);
  const supportCount = supports.length;
  const itemCount = supportCount + 1;
  const hasSupports = supportCount > 0;

  const ConfigWrapper = getConfigWrapper({ supportCount });
  const Container = getContainer({ hasSupports });
  const LeadContainer = getLeadContainer({
    hasSupports,
    supportCount
  });
  const leadConfig = getLeadConfig({ itemCount });

  const renderSupportsContainer = () => (
    <SupportsContainer>
      {supports.map((support, index) => {
        const SupportContainer = getSupportContainer({ index });
        return (
          <SupportContainer key={support.props.id}>{support}</SupportContainer>
        );
      })}
    </SupportsContainer>
  );

  return (
    <ConfigWrapper>
      <SliceContainer>
        <Container>
          <LeadContainer>{renderLead(leadConfig)}</LeadContainer>
          {hasSupports && <Separator />}
          {hasSupports && renderSupportsContainer()}
        </Container>
      </SliceContainer>
    </ConfigWrapper>
  );
};

LeadOneAndTwoSlice.propTypes = {
  renderLead: PropTypes.func.isRequired,
  renderSupport1: PropTypes.func.isRequired,
  renderSupport2: PropTypes.func.isRequired
};

export default LeadOneAndTwoSlice;

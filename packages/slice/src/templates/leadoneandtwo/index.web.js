import React, { Component } from "react";
import propTypes from "./proptypes";
import { getSeparator, SliceContainer } from "../styles/responsive";
import {
  getContainer,
  getLeadContainer,
  getSupportContainer,
  SupportsContainer
} from "./responsive";
import {
  getLeadConfig,
  getSupportConfig,
  getConfigWrapper
} from "./config.web";

const supportConfig = getSupportConfig();
const Separator = getSeparator({ hasLeftRightMargin: false });

class LeadOneAndTwoSlice extends Component {
  constructor(props) {
    super(props);

    const supports = [
      props.renderSupport1(supportConfig),
      props.renderSupport2(supportConfig)
    ].filter(support => support);
    const supportCount = supports.length;
    const itemCount = supportCount + 1;
    this.hasSupports = supportCount > 0;

    this.ConfigWrapper = getConfigWrapper({ supportCount });
    this.Container = getContainer({ hasSupports: this.hasSupports });
    this.LeadContainer = getLeadContainer({
      hasSupports: this.hasSupports,
      supportCount
    });
    this.leadConfig = getLeadConfig({ itemCount });

    supports.forEach((s, index) => {
      this[`SupportContainer${index}`] = getSupportContainer({ index: 0 });
    });
  }

  render() {
    const { renderLead, renderSupport1, renderSupport2 } = this.props;
    const support1 = renderSupport1(supportConfig);
    const support2 = renderSupport2(supportConfig);
    const supports = [support1, support2].filter(support => support);

    const renderSupportsContainer = () => (
      <SupportsContainer>
        {supports.map((support, index) => {
          const SupportContainer = this[`SupportContainer${index}`];
          return (
            <SupportContainer key={support.props.id}>
              {support}
            </SupportContainer>
          );
        })}
      </SupportsContainer>
    );

    const { ConfigWrapper, Container, LeadContainer, leadConfig } = this;

    return (
      <ConfigWrapper>
        <SliceContainer>
          <Container>
            <LeadContainer>{renderLead(leadConfig)}</LeadContainer>
            {this.hasSupports && <Separator />}
            {this.hasSupports && renderSupportsContainer()}
          </Container>
        </SliceContainer>
      </ConfigWrapper>
    );
  }
}

LeadOneAndTwoSlice.propTypes = propTypes;

export default LeadOneAndTwoSlice;

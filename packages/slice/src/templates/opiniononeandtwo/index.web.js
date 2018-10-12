import React, { Component } from "react";
import { propTypes, defaultProps } from "./proptypes";
import { SliceContainer } from "../styles/responsive";
import {
  getSeparator,
  getContainer,
  getOpinionContainer,
  getSupportContainer,
  getSupportsContainer
} from "./responsive";
import { getOpinionConfig, getSupportConfig, getConfigWrapper } from "./config";

const supportConfig = getSupportConfig();

class OpinionOneAndTwoSlice extends Component {
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
    this.Container = getContainer({ supportCount });
    this.OpinionContainer = getOpinionContainer({
      hasSupports: this.hasSupports,
      supportCount
    });
    this.opinionConfig = getOpinionConfig({ itemCount });
    this.Separator = getSeparator({ itemCount });
    this.SupportsContainer = getSupportsContainer({ supportCount });

    supports.forEach((s, index) => {
      this[`SupportContainer${index}`] = getSupportContainer({
        index,
        supportCount
      });
    });
  }

  render() {
    const { renderOpinion, renderSupport1, renderSupport2 } = this.props;
    const support1 = renderSupport1(supportConfig);
    const support2 = renderSupport2(supportConfig);
    const supports = [support1, support2].filter(support => support);

    const {
      ConfigWrapper,
      Container,
      OpinionContainer,
      Separator,
      SupportsContainer
    } = this;

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

    return (
      <ConfigWrapper>
        <SliceContainer>
          <Container>
            <OpinionContainer>
              {renderOpinion(this.opinionConfig)}
            </OpinionContainer>
            {this.hasSupports && <Separator />}
            {this.hasSupports && renderSupportsContainer()}
          </Container>
        </SliceContainer>
      </ConfigWrapper>
    );
  }
}

OpinionOneAndTwoSlice.propTypes = propTypes;
OpinionOneAndTwoSlice.defaultProps = defaultProps;

export default OpinionOneAndTwoSlice;

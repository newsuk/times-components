import React from "react";
import propTypes from "./proptypes";
import { SliceContainer } from "../styles/responsive";
import {
  getSeparator,
  getContainer,
  getOpinionContainer,
  getSupportContainer,
  getSupportsContainer
} from "./responsive";
import {
  getOpinionConfig,
  getSupportConfig,
  getConfigWrapper
} from "./config.web";

const supportConfig = getSupportConfig();

const OpinionOneAndTwoSlice = ({
  renderOpinion,
  renderSupport1,
  renderSupport2
}) => {
  const supports = [
    renderSupport1(supportConfig),
    renderSupport2(supportConfig)
  ].filter(support => support);
  const supportCount = supports.length;
  const itemCount = supportCount + 1;
  const hasSupports = supportCount > 0;

  const ConfigWrapper = getConfigWrapper({ supportCount });
  const Container = getContainer({ supportCount });
  const OpinionContainer = getOpinionContainer({
    hasSupports,
    supportCount
  });
  const opinionConfig = getOpinionConfig({ itemCount });
  const Separator = getSeparator({ itemCount });
  const SupportsContainer = getSupportsContainer({ supportCount });

  const renderSupportsContainer = () => (
    <SupportsContainer>
      {supports.map((support, index) => {
        const SupportContainer = getSupportContainer({
          index,
          supportCount
        });
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
          <OpinionContainer>{renderOpinion(opinionConfig)}</OpinionContainer>
          {hasSupports && <Separator />}
          {hasSupports && renderSupportsContainer()}
        </Container>
      </SliceContainer>
    </ConfigWrapper>
  );
};

OpinionOneAndTwoSlice.propTypes = propTypes;

export default OpinionOneAndTwoSlice;

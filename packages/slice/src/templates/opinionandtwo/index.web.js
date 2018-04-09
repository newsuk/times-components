import React from "react";
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

const OpinionAndTwoSlice = ({ opinion, renderSupports }) => {
  const supports = renderSupports(getSupportConfig());
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
          <OpinionContainer>{opinion(opinionConfig)}</OpinionContainer>
          {hasSupports && <Separator />}
          {hasSupports && renderSupportsContainer()}
        </Container>
      </SliceContainer>
    </ConfigWrapper>
  );
};

OpinionAndTwoSlice.propTypes = propTypes;
OpinionAndTwoSlice.defaultProps = defaultProps;

export default OpinionAndTwoSlice;

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
  const supportConfig = getSupportConfig();
  const supports = renderSupports(supportConfig);
  const supportCount = supports.length;
  const itemCount = supportCount + 1;
  const hasSupports = supportCount > 0;
  const ConfigWrapper = getConfigWrapper({ supportCount });
  const Container = getContainer({ hasSupports });
  const SupportsContainer = getSupportsContainer({ itemCount });
  const OpinionContainer = getOpinionContainer({
    hasSupports,
    supportCount
  });
  const Separator = getSeparator({ hasLeftRightMargin: false, itemCount });

  const opinionConfig = getOpinionConfig(itemCount);

  return (
    <ConfigWrapper>
      <SliceContainer>
        <Container>
          <OpinionContainer>{opinion(opinionConfig)}</OpinionContainer>
          {hasSupports && <Separator />}
          {hasSupports && (
            <SupportsContainer>
              {supports.map((support, index) => {
                const SupportContainer = getSupportContainer({
                  index,
                  supportCount
                });
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

OpinionAndTwoSlice.propTypes = propTypes;
OpinionAndTwoSlice.defaultProps = defaultProps;

export default OpinionAndTwoSlice;

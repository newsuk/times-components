import React from "react";
import propTypes from "./proptypes";
import { getSeparator, SliceContainer } from "../styles/responsive";
import { getChildrenContainer, ChildContainer } from "./responsive";
import config, { getConfigWrapper } from "./config";

const StandardSlice = ({ itemCount, renderItems }) => {
  const ConfigWrapper = getConfigWrapper({ itemCount });
  const ChildrenContainer = getChildrenContainer({
    childCount: itemCount
  });
  const Separator = getSeparator({ hasLeftRightMargin: true });

  return (
    <ConfigWrapper>
      <SliceContainer>
        <ChildrenContainer>
          {renderItems(config)
            .map(item => (
              <ChildContainer key={item.props.id}>{item}</ChildContainer>
            ))
            .reduce((previous, current) => [
              ...(previous.length > 0 ? previous : [previous]),
              <Separator key={`separator-${current.key}`} />,
              current
            ])}
        </ChildrenContainer>
      </SliceContainer>
    </ConfigWrapper>
  );
};

StandardSlice.propTypes = propTypes;

export default StandardSlice;

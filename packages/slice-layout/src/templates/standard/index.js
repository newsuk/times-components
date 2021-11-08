import React, { Component } from "react";
import PropTypes from "prop-types";
import { getSeparator, SliceContainer } from "../styles/responsive";
import { getChildrenContainer, ChildContainer } from "./responsive";
import { getConfig, getConfigWrapper } from "./config";

const Separator = getSeparator({ hasLeftRightMargin: true });

class StandardSlice extends Component {
  constructor(props) {
    super(props);

    const { itemCount } = this.props;
    this.ConfigWrapper = getConfigWrapper({ itemCount });
    this.config = getConfig({ itemCount });
    this.ChildrenContainer = getChildrenContainer({
      childCount: itemCount
    });
  }

  render() {
    const { renderItems } = this.props;

    const items = renderItems(this.config);

    if (items.length === 0) {
      return null;
    }

    const { ChildrenContainer, ConfigWrapper } = this;

    return (
      <ConfigWrapper>
        <SliceContainer>
          <ChildrenContainer>
            {items
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
  }
}

StandardSlice.propTypes = {
  itemCount: PropTypes.number.isRequired,
  renderItems: PropTypes.func.isRequired
};

export default StandardSlice;

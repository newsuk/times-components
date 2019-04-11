import React, { Fragment } from "react";
import { editionBreakpoints } from "@times-components/styleguide";
import styleFactory from "./styles";
import { propTypes, defaultProps } from "./proptypes";
import { ItemRowSeparator } from "../shared";
import HorizontalLayout from "../horizontallayout";

const SecondaryFourSlice = ({
  breakpoint,
  secondary1,
  secondary2,
  secondary3,
  secondary4
}) => {
  const { item, itemContainer, container } = styleFactory(breakpoint);
  if (breakpoint === editionBreakpoints.small) {
    return (
      <Fragment>
        <HorizontalLayout
          containerStyle={itemContainer}
          tiles={[
            { style: item, tile: secondary1 },
            { style: item, tile: secondary2 }
          ]}
        />
        <ItemRowSeparator />
        <HorizontalLayout
          containerStyle={itemContainer}
          tiles={[
            { style: item, tile: secondary3 },
            { style: item, tile: secondary4 }
          ]}
        />
      </Fragment>
    );
  }

  return (
    <HorizontalLayout
      containerStyle={container}
      tiles={[
        { style: item, tile: secondary1 },
        { style: item, tile: secondary2 },
        { style: item, tile: secondary3 },
        { style: item, tile: secondary4 }
      ]}
    />
  );
};

SecondaryFourSlice.propTypes = propTypes;
SecondaryFourSlice.defaultProps = defaultProps;

export default SecondaryFourSlice;

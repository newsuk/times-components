import React from "react";
import PropTypes from "prop-types";

import DatawrapperFrame from "../styles/datawrapper";

export const parseDatawrapperAttributes = attributes => {
  if (attributes.hasOwnProperty('embed-code')) {
    const matches = attributes['embed-code'].match(/datawrapper.dwcdn.net%2F(.*?%2F.*?)%2F/);

    if (!matches[1]) {
      throw new Error("The provided Datawrapper embed code is not valid.");
    }

    const [id, version] = decodeURIComponent(matches[1]).split("/");

    return {
      id,
      version
    };
  }

  if (attributes.hasOwnProperty('chart-id')) {
    return {
      id: attributes['chart-id'],
      version: attributes['version'] || null
    }
  }

  throw new Error("Invalid attributes provided to the Datawrapper embed, unable to render.")
};

const buildFrameUrl = (id, version) => {
  if (!version) {
    return `https://datawrapper.dwcdn.net/${id}`;
  }

  return `https://datawrapper.dwcdn.net/${id}/${version}`;
}

const Datawrapper = ({ id, version }) => {
  const [frameHeight, setFrameHeight] = React.useState(0);

  const handleFrameMessage = React.useCallback(
    ({ data }) => {
      if (typeof data["datawrapper-height"] === "undefined") {
        return;
      }

      const matchingKey = Object.keys(data["datawrapper-height"]).find(
        key => key === id
      );

      if (!matchingKey) {
        return;
      }

      setFrameHeight(data["datawrapper-height"][matchingKey]);
    },
    [id]
  );

  React.useEffect(
    () => {
      if (typeof window === "undefined") {
        return () => {};
      }

      window.addEventListener("message", handleFrameMessage);

      return () => window.removeEventListener("message", handleFrameMessage);
    },
    [id]
  );

  return (
    <DatawrapperFrame
      src={buildFrameUrl(id, version)}
      height={frameHeight}
      scrolling="no"
    />
  );
};

Datawrapper.propTypes = {
  id: PropTypes.string.isRequired,
  version: PropTypes.string
};

export default Datawrapper;

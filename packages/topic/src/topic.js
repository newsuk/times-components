import React from "react";
import PropTypes from "prop-types";
import TopicHead from "./topic-head";

const Topic = ({ name, description }) => (
  <TopicHead name={name} description={description} />
);

Topic.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string
};

Topic.defaultProps = {
  description: ""
};

export default Topic;

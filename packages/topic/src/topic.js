import React from "react";
import { propTypes, defaultProps } from "./proptypes";
import TopicHead from "./topic-head";

const Topic = ({ name, description }) => (
  <TopicHead name={name} description={description} />
);

Topic.propTypes = propTypes;
Topic.defaultProps = defaultProps;

export default Topic;

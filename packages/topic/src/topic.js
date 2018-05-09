import React from "react";
import { propTypes, defaultProps } from "./proptypes";
import TopicHead from "./topic-head";

const Topic = ({ name, description, isLoading }) => (
  <TopicHead name={name} description={description} isLoading={isLoading} />
);

Topic.propTypes = propTypes;
Topic.defaultProps = defaultProps;

export default Topic;

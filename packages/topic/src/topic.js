import React from "react";
import { withPageState } from "@times-components/pagination";
import Responsive from "@times-components/responsive";
import { propTypes, defaultProps } from "./topic-prop-types";
import topicTrackingContext from "./topic-tracking-context";
import TopicHead from "./topic-head";

const Topic = ({ topic }) => {
  const { name, description } = topic;

  return (
    <Responsive>
      <TopicHead description={description} name={name} />
    </Responsive>
  );
};

Topic.propTypes = propTypes;
Topic.defaultProps = defaultProps;

export default withPageState(topicTrackingContext(Topic));

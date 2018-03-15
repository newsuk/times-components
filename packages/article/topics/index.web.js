import React from "react";
import Topics from "@times-components/topics";
import styles from "./styles";
import { TopicsContainer, TopicsMetaContainer } from "./styles/responsive";

const ShowTopics = ({topics, device}) => {
  if(topics && topics.length > 0) {
    if(device === "DESKTOP"){
      return (
        <TopicsMetaContainer>
          <Topics topics={topics} style={styles.topicsMetaContainer} />
        </TopicsMetaContainer>
      );
    }

    return (
      <TopicsContainer>
        <Topics topics={topics} style={styles.topicsContainer} />
      </TopicsContainer>
    );
  }

  return null;
}

export default ShowTopics;

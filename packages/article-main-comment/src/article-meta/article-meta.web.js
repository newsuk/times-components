import React from "react";
import { Text } from "react-native";
import { ArticleBylineWithLinks } from "@times-components/article-byline";
import Context from "@times-components/context";
import DatePublication from "@times-components/date-publication";
import { colours } from "@times-components/styleguide";

import metaPropTypes from "./article-meta-prop-types";
import { Meta, MetaContainer, Seperator } from "../styles/responsive.web";
import styles from "../styles";

const ArticleMeta = ({ byline, publicationName, publishedTime }) => (
  <MetaContainer>
    <Meta>
      <Context.Consumer>
        {({ theme: { sectionColour } }) => (
          <ArticleBylineWithLinks
            ast={byline}
            color={sectionColour || colours.section.default}
          />
        )}
      </Context.Consumer>
    </Meta>
    <Seperator />
    <Meta>
      <Text style={styles.datePublication}>
        <DatePublication date={publishedTime} publication={publicationName} />
      </Text>
    </Meta>
  </MetaContainer>
);

ArticleMeta.propTypes = metaPropTypes;

export default ArticleMeta;

import React from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import Image from '@times-components/image';
import CopyParagraph, { PullQuoteParagraph } from './copy-paragraph';

const ArticleCopy = ({ content }) => {
  const data = content.map((item, index) => {
    switch (item.type) {
      case('paragraph'): {
        return <CopyParagraph content={item.data.text} index={index} />;
      }
      case('image'): {
        const imageSrc = {
          uri: `https://www.thetimes.co.uk/imageserver/image/methode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2F${item.data.id}.jpg`
        }
        return <Image source={imageSrc} />
      }
      case('pull-quote'): {
        return <PullQuoteParagraph content={item.data.text} index={index} />;
      }
      default: {
        return null;
      }
    }
  });

  return <ScrollView>{data}</ScrollView>;
}

ArticleCopy.propTypes = {
  content: PropTypes.arrayOf(PropTypes.object),
}

export default ArticleCopy;

export {
  CopyParagraph
}

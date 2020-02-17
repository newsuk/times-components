import ArticleByline from '@times-components/article-byline';
import { ArticleSummaryHeadline } from '@times-components/article-summary';
import Image from '@times-components/responsive-image';
import { spacing } from '@times-components/styleguide';
import PropTypes from 'prop-types';
import React from 'react';
import { connectInfiniteHits } from 'react-instantsearch-native';
import { FlatList, NativeModules, TouchableOpacity, View } from 'react-native';
import HTML from 'react-native-render-html';
import styles from './styles';

// tslint:disable-next-line: no-empty
const { onArticlePress } = NativeModules.SectionEvents || { onArticlePress: () => {} };

interface ResultsProps {
  hits: any;
  hasMore: any;
  refine: any;
}

const tagsStyles = {
  b: { fontWeight: 'bold' },
  i: { fontStyle: 'italic' },
  p: { paddingTop: 0, paddingRight: spacing(2) }
};

const ignoredTags = ['img', 'br'];

const cleanup = (content: string) =>
  content.replace(/<p>\s*<\/p>/gi, '').slice(0, 400);

const Results = ({ hits, hasMore, refine }: ResultsProps) => (
  <FlatList
    data={hits}
    keyExtractor={(item: any) => item.objectID}
    ItemSeparatorComponent={() => <View style={styles.separator} />}
    onEndReached={() => hasMore && refine()}
    renderItem={({ item }) => {
      const { id } = item;
      return (
        <View style={styles.item}>
          <TouchableOpacity onPress={() => onArticlePress('', id)}>
            <ArticleByline ast={[item]} bylineStyle={styles.byline} />
            {item.headline !== null && (
              <ArticleSummaryHeadline
                style={styles.headline}
                headline={item.headline}
              />
            )}
            <View style={styles.row}>
              {item.leadAsset &&
                item.leadAsset.crop && (
                  <Image uri={item.leadAsset.crop.url} style={styles.image} />
                )}
              <View style={styles.summary}>
                {item.content !== null && (
                  <HTML
                    html={cleanup(item.content)}
                    tagsStyles={tagsStyles}
                    baseFontStyle={styles.text}
                    ignoredTags={ignoredTags}
                  />
                )}
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    }}
  />
);

Results.propTypes = {
  hasMore: PropTypes.bool.isRequired,
  hits: PropTypes.arrayOf(PropTypes.object).isRequired,
  refine: PropTypes.func.isRequired
};

export default connectInfiniteHits(Results) as any;

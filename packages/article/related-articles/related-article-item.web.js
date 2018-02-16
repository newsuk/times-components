import React from "react";
import { Text } from "react-native";
import get from "lodash.get";
import ArticleSummary, {
  ArticleSummaryContent
} from "@times-components/article-summary";
import Image from "@times-components/image";
import Link from "@times-components/link";
import getTemplateName from "@times-components/slice/styles/template-map";
import { relatedArticleItemPropTypes } from "./proptypes";
import getStyledComponent from "./styles/responsive";
import styles from "./styles/shared";

const RelatedArticleItem = ({
  article,
  onPress,
  relatedArticleContainer: RelatedArticleContainer,
  imageContainer: ImageContainer,
  summaryContainer: SummaryContainer,
  template
}) => {
  const { byline, label, headline, publishedTime, summary, url } = article;

  const imageUri = get(
    article,
    "leadAsset.crop.url",
    get(article, "leadAsset.posterImage.crop.url", null)
  );

  const templateName = getTemplateName(template);

  const Headline = getStyledComponent(Text, templateName, "Headline");

  return (
    <Link url={url} onPress={onPress}>
      <RelatedArticleContainer>
        {imageUri ? (
          <ImageContainer>
            <Image uri={`${imageUri}&resize=996`} aspectRatio={16 / 9} />
          </ImageContainer>
        ) : null}
        <SummaryContainer>
          <ArticleSummary
            bylineProps={{ ast: byline }}
            datePublicationProps={{ date: publishedTime }}
            headline={() => (
              <Headline>
                <Text
                  accessibilityRole="heading"
                  aria-level="3"
                  style={styles.headline}
                >
                  {headline}
                </Text>
              </Headline>
            )}
            labelProps={{ title: label, color: "#333333" }}
            content={() => <ArticleSummaryContent ast={summary} />}
          />
        </SummaryContainer>
      </RelatedArticleContainer>
    </Link>
  );
};

RelatedArticleItem.propTypes = relatedArticleItemPropTypes;

export default RelatedArticleItem;

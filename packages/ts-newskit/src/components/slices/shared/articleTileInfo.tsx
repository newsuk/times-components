import React from 'react';
import { Block, TextBlock, Divider } from 'newskit';
import { ContainerInline } from '../shared-styles';
import { LiveTag } from './live-tag';

export interface ArticleTileInfoProps {
  expirableFlag?: string;
  contentType?: string;
  articleLabel?: string;
  marginBottom?: string;
  marginTop?: string;
}

const CustomTextBlock = ({
  text,
  stylePreset
}: {
  text: string;
  stylePreset?: string;
}) => (
  <TextBlock
    typographyPreset="customArticleTileInfoPreset"
    stylePreset={stylePreset ? stylePreset : 'inkBrand010'}
    as="span"
  >
    {text.toUpperCase()}
  </TextBlock>
);

const CustomDivider = () => (
  <ContainerInline>
    <Divider
      vertical
      overrides={{
        marginInline: 'space020'
      }}
    />
  </ContainerInline>
);

export const ArticleTileInfo = ({
  expirableFlag,
  contentType,
  articleLabel,
  marginTop = 'space000',
  marginBottom = 'space000'
}: ArticleTileInfoProps) => {
  const hasTag = Boolean(contentType);
  const hasExpirableFlag = Boolean(expirableFlag && expirableFlag !== '');

  if (!hasTag && !hasExpirableFlag && !articleLabel) {
    return null;
  }

  return (
    <Block marginBlockStart={marginTop} marginBlockEnd={marginBottom}>
      {expirableFlag === 'live' ? (
        <LiveTag liveTag={expirableFlag} />
      ) : (
        expirableFlag && (
          <CustomTextBlock
            stylePreset="expirableFlagPreset"
            text={expirableFlag}
          />
        )
      )}
      {contentType && expirableFlag && <CustomDivider />}
      {contentType && <CustomTextBlock text={contentType} />}
      {articleLabel && <CustomDivider />}
      {articleLabel && <CustomTextBlock text={articleLabel} />}
    </Block>
  );
};

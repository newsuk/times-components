import React from 'react';
import { TextBlock, Divider } from 'newskit';
import { ContainerInline, StyledBlock, Wrapper } from '../shared-styles';
import { LiveTag } from './live-tag';
import { NewsKitVideoButtonIcon } from '../../../assets/index';

export interface ArticleTileInfoProps {
  expirableFlag?: string;
  contentType?: string;
  articleLabel?: string;
  marginBottom?: string;
  marginTop?: string;
}

const CustomTextBlock = ({
  text,
  stylePreset,
  hasVideoIcon
}: {
  text: string;
  stylePreset?: string;
  hasVideoIcon?: boolean;
}) => {
  const capitalizedText = text.toUpperCase();
  return (
    <TextBlock
      typographyPreset="customArticleTileInfoPreset"
      stylePreset={stylePreset ? stylePreset : 'inkBrand010'}
      as="span"
    >
      {hasVideoIcon ? (
        <Wrapper>
          <NewsKitVideoButtonIcon />
          {capitalizedText}
        </Wrapper>
      ) : (
        capitalizedText
      )}
    </TextBlock>
  );
};

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
  const hasVideoIcon = Boolean(
    contentType && contentType.toUpperCase() === 'VIDEO'
  );
  const isLiveTag = Boolean(
    expirableFlag && expirableFlag.toUpperCase() === 'LIVE'
  );
  if (!hasTag && !hasExpirableFlag && !articleLabel) {
    return null;
  }

  return (
    <StyledBlock
      marginBlockStart={marginTop}
      marginBlockEnd={marginBottom}
      hasVideoIcon={hasVideoIcon}
    >
      {isLiveTag ? (
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
      {contentType && (
        <CustomTextBlock text={contentType} hasVideoIcon={hasVideoIcon} />
      )}
      {articleLabel && <CustomDivider />}
      {articleLabel && <CustomTextBlock text={articleLabel} />}
    </StyledBlock>
  );
};

import React from 'react';
import { Divider } from 'newskit';
import { ContainerInline, StyledBlock } from '../shared-styles';
import { LiveTag } from './live-tag';
import { NewsKitVideoButtonIcon } from '../../../assets/index';
import { CustomTextBlock } from './customTextBlock';

export interface ArticleTileInfoProps {
  expirableFlag?: string;
  contentType?: string;
  articleLabel?: string;
  marginBlockEnd?: string;
  marginBlockStart?: string;
}

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
  marginBlockStart = 'space000',
  marginBlockEnd = 'space000'
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
  const capitalizedText = (text: string) => text.toUpperCase();

  return (
    <StyledBlock
      marginBlockStart={marginBlockStart}
      marginBlockEnd={marginBlockEnd}
      hasVideoIcon={hasVideoIcon}
    >
      {isLiveTag && expirableFlag ? (
        <LiveTag liveTag={capitalizedText(expirableFlag)} />
      ) : (
        expirableFlag && (
          <CustomTextBlock
            stylePreset="expirableFlagPreset"
            text={capitalizedText(expirableFlag)}
          />
        )
      )}
      {contentType && expirableFlag && <CustomDivider />}
      {contentType && (
        <CustomTextBlock
          text={capitalizedText(contentType)}
          icon={hasVideoIcon && <NewsKitVideoButtonIcon />}
        />
      )}
      {articleLabel && (contentType || expirableFlag) && <CustomDivider />}
      {articleLabel && <CustomTextBlock text={capitalizedText(articleLabel)} />}
    </StyledBlock>
  );
};

import React from 'react';
import { Divider } from 'newskit';
import { ContainerInline, StyledBlock } from '../shared-styles';
import { LiveTag } from './live-tag';
import { NewsKitVideoButtonIcon } from '../../../assets/index';
import { CustomTextBlock } from './customTextBlock';
import { getActiveArticleFlags } from '../../../utils/getActiveArticleFlag';

export type expirableFlagsProps = {
  type: string;
  expiryTime: string | null;
};

export interface ArticleTileInfoProps {
  expirableFlags?: expirableFlagsProps[];
  hasVideo: boolean;
  contentType?: string;
  label?: string;
  marginBlockEnd?: string;
  marginBlockStart?: string;
}

const CustomDivider = () => (
  <ContainerInline>
    <Divider
      vertical
      overrides={{
        marginInline: 'space020',
      }}
    />
  </ContainerInline>
);

export const ArticleTileInfo = ({
  expirableFlags,
  contentType,
  hasVideo,
  label,
  marginBlockStart = 'space000',
  marginBlockEnd = 'space000'
}: ArticleTileInfoProps) => {
  const hasTag = Boolean(contentType);

  const hasExpirableFlag =
    expirableFlags && getActiveArticleFlags(expirableFlags);

  const hasVideoIcon = Boolean(
    contentType && contentType.toUpperCase() === 'VIDEO'
  );
  const isLiveTag =
    expirableFlags &&
    getActiveArticleFlags(expirableFlags) &&
    expirableFlags[0].type.toUpperCase() === 'LIVE';

  if (!hasTag && !hasExpirableFlag && !label) {
    return null;
  }
  const capitalizedText = (text?: string) => text && text.toUpperCase();

  return (
    <>
    <StyledBlock
      marginBlockStart={marginBlockStart}
      marginBlockEnd={marginBlockEnd}
      hasVideoIcon={hasVideoIcon}
      className="article-info"
    ><>
      {isLiveTag && (
        <LiveTag
          liveTag={capitalizedText(getActiveArticleFlags(expirableFlags))}
        />
      )}
      {!isLiveTag && expirableFlags && getActiveArticleFlags(expirableFlags) && 
      <CustomTextBlock
            stylePreset="expirableFlagPreset"
            text={capitalizedText(getActiveArticleFlags(expirableFlags))}
          /> }
      {contentType && (
        <CustomTextBlock
          text={capitalizedText(contentType)}
        />
      )}
      {hasVideo && (
        <CustomTextBlock
        text="VIDEO"
        icon={<NewsKitVideoButtonIcon />}
      />
      )}
      {label && <CustomTextBlock text={capitalizedText(label)} />}
      </>
    </StyledBlock>
    <CustomDivider/>
    </>
  );
};

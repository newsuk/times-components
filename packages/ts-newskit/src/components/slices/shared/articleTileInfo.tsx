import React from 'react';
import { Divider } from 'newskit';
import { ContainerInline, StyledBlock } from '../shared-styles';
import { LiveTag } from './live-tag';
import { CustomTextBlock } from './customTextBlock';
import { getActiveArticleFlags } from '../../../utils/getActiveArticleFlag';
import { NewsKitVideoButtonIcon as VideoIcon } from '../../../assets';
import { expirableFlagsProps } from '../../../slices/types';

interface ArticleTileInfoProps {
  expirableFlags?: expirableFlagsProps[];
  hasVideo: boolean;
  contentType?: string;
  label?: string;
  marginBlockEnd?: string;
  marginBlockStart?: string;
}

const TileWrapper = ({ children }: { children: React.ReactNode }) => (
  <>
    {children}
    <ContainerInline>
      <Divider
        vertical
        overrides={{
          marginInline: 'space020'
        }}
      />
    </ContainerInline>
  </>
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
        className="article-info"
        marginBlockStart={marginBlockStart}
        marginBlockEnd={marginBlockEnd}
      >
        <>
          {isLiveTag &&
            expirableFlags && (
              <TileWrapper>
                <LiveTag
                  liveTag={capitalizedText(
                    getActiveArticleFlags(expirableFlags)
                  )}
                />
              </TileWrapper>
            )}
          {!isLiveTag &&
            expirableFlags &&
            getActiveArticleFlags(expirableFlags) && (
              <TileWrapper>
                <CustomTextBlock
                  stylePreset="expirableFlagPreset"
                  text={capitalizedText(getActiveArticleFlags(expirableFlags))}
                />
              </TileWrapper>
            )}
          {contentType && (
            <TileWrapper>
              <CustomTextBlock text={capitalizedText(contentType)} />
            </TileWrapper>
          )}
          {hasVideo && (
            <TileWrapper>
              <CustomTextBlock
                text="VIDEO"
                stylePreset="inkContrast"
                icon={<VideoIcon />}
              />
            </TileWrapper>
          )}
          {label && (
            <TileWrapper>
              <CustomTextBlock text={capitalizedText(label)} />
            </TileWrapper>
          )}
        </>
      </StyledBlock>
    </>
  );
};

import React from 'react';
import { ArticleBylineAuthorData } from '../../types/related-article-slice';
import {
  BylineBlockContainer,
  BylineBlockImgContainer,
  BylineBlockImg,
  BylineBlockContent,
  BylineBlockAuthorContent,
  BylineBlockAuthorName,
  BylineBlockAuthorJobTitle,
  BylineBlockDescription
} from './styles';

export const ArticleBylineBlock: React.FC<{
  authorData?: ArticleBylineAuthorData;
  description?: string;
}> = ({ authorData, description }) => {
  if (
    !((authorData && authorData.name) || (authorData && authorData.image)) &&
    !description
  ) {
    return null;
  }

  return (
    <BylineBlockContainer>
      {authorData &&
        authorData.image && (
          <BylineBlockImgContainer>
            <BylineBlockImg src={authorData.image} alt={authorData.name} />
          </BylineBlockImgContainer>
        )}
      <BylineBlockContent>
        <BylineBlockAuthorContent>
          {authorData &&
            authorData.name && (
              <BylineBlockAuthorName>{authorData.name}</BylineBlockAuthorName>
            )}
          {authorData &&
            authorData.jobTitle && (
              <BylineBlockAuthorJobTitle>
                {authorData.jobTitle}
              </BylineBlockAuthorJobTitle>
            )}
        </BylineBlockAuthorContent>
        {description && (
          <BylineBlockDescription>{description}</BylineBlockDescription>
        )}
      </BylineBlockContent>
    </BylineBlockContainer>
  );
};

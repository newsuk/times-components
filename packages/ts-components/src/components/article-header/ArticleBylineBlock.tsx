import React from 'react';
import { ArticleByline } from '../../types/related-article-slice';
import {
  BylineBlockContainer,
  BylineBlockImgContainer,
  BylineBlockImg,
  BylineBlockContent,
  BylineBlockAuthorContent,
  BylineBlockAuthorName,
  BylineBlockAuthorJobTitle,
  BylineBlockAuthorDescription
} from './styles';

export const ArticleBylineBlock: React.FC<{
  data?: ArticleByline | null;
  description?: string;
}> = ({ data, description }) => {
  if (!(data && data.name && data.image) && !description) {
    return null;
  }

  return (
    <BylineBlockContainer>
      {data &&
        data.image && (
          <BylineBlockImgContainer>
            <BylineBlockImg src={data.image} alt={data.name} />
          </BylineBlockImgContainer>
        )}
      <BylineBlockContent>
        <BylineBlockAuthorContent>
          {data &&
            data.name && (
              <BylineBlockAuthorName>{data.name}</BylineBlockAuthorName>
            )}
          {data &&
            data.jobTitle && (
              <BylineBlockAuthorJobTitle>
                {data.jobTitle}
              </BylineBlockAuthorJobTitle>
            )}
        </BylineBlockAuthorContent>
        {description && (
          <BylineBlockAuthorDescription>
            {description}
          </BylineBlockAuthorDescription>
        )}
      </BylineBlockContent>
    </BylineBlockContainer>
  );
};

import React, { FC } from 'react';
import {
  CardContent,
  CardComposable,
  CardLink,
  Headline,
  Block
} from 'newskit';
import { StyledIconWrapper } from './styles';

export interface CategoryCardProps {
  type: string;
  url: string;
  Icon: React.ComponentType;
  onClick?: (categoryName: string) => void;
}

export const CategoryCard: FC<CategoryCardProps> = ({
  type,
  url,
  Icon,
  onClick
}) => {
  
  const handleClick = () => {
    if(onClick) {
      onClick(type);
    }
  };

  return (
    <Block
      paddingBlockEnd={{
        xs: 'space020',
        lg: 'space070'
      }}
    >
      <CardComposable>
        <StyledIconWrapper
          flow="vertical-center"
          stackDistribution="center"
          paddingBlock={{
            xs: 'space040',
            sm: 'space060',
            md: 'space040',
            lg: 'space040',
            xl: 'space050'
          }}
        >
          <Icon />
        </StyledIconWrapper>
        <CardContent>
          <CardLink
            onClick={handleClick}
            expand
            href={url}
            data-testid="categoryCard-link"
            overrides={{
              externalIcon: {
                size: '0'
              },
              stylePreset: 'inkContrast'
            }}
          >
            <Headline
              headingAs="h3"
              overrides={{
                marginBlockEnd: 'space040',
                marginBlockStart: 'space040',
                typographyPreset: 'editorialHeadline010'
              }}
            >
              {type}
            </Headline>
          </CardLink>
        </CardContent>
      </CardComposable>
    </Block>
  );
};

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
}

export const CategoryCard: FC<CategoryCardProps> = ({ type, url, Icon }) => {
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
            sm: 'space050',
            md: 'space050',
            lg: 'space060',
            xl: 'space070'
          }}
        >
          <Icon />
        </StyledIconWrapper>
        <CardContent>
          <CardLink
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
                typographyPreset: 'editorialHeadline020'
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

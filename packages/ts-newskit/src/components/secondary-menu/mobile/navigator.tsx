import React from 'react';
import { MenuSub, TextBlock, Block } from 'newskit';
import { SecondaryMenuOptions } from '../types';

export const Navigator: React.FC<{
  options: SecondaryMenuOptions;
  title: string;
  subMenuTitle: string;
}> = ({ title, options, subMenuTitle }) => {
  const { isExpanded, setIsExpanded } = options;

  return (
    <Block stylePreset="menuBlock">
      <Block stylePreset="textBlock">
        <TextBlock typographyPreset="utilityHeading060">{title}</TextBlock>
      </Block>
      <MenuSub
        title={subMenuTitle}
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
        overrides={{
          stylePreset: 'subMenu',
          typographyPreset: 'newPreset030',
          indicatorIcon: {
            props: {
              overrides: {
                stylePreset: 'icon'
              }
            }
          }
        }}
      >
        {null}
      </MenuSub>
    </Block>
  );
};

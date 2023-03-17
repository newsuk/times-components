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
    <Block stylePreset="secondaryNavMenuBlock">
      <TextBlock
        stylePreset="secondaryNavTextBlock"
        typographyPreset="utilityHeading060"
      >
        {title}
      </TextBlock>
      <MenuSub
        title={subMenuTitle}
        expanded={isExpanded}
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

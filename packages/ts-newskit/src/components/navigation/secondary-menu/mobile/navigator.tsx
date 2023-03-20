import React from 'react';
import { MenuSub, TextBlock } from 'newskit';
import { SecondaryMenuOptions } from '../types';
import { StyledBlock } from '../styles';

export const Navigator: React.FC<{
  options: SecondaryMenuOptions;
  title: string;
  subMenuTitle: string;
}> = ({ title, options, subMenuTitle }) => {
  const { isExpanded, setIsExpanded } = options;

  return (
    <StyledBlock
      paddingInlineStart="space040"
      paddingInlineEnd="space040"
      stylePreset="secondaryNavMenuBlock"
    >
      <TextBlock
        marginBlockStart="space040"
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
          marginBlockStart: 'space020',
          marginInlineEnd: 'space020',
          paddingInline: 'space030',
          minHeight: 'sizing060',
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
    </StyledBlock>
  );
};

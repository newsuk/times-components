import React from 'react';
import { MenuSub, TextBlock, Block } from 'newskit';

export const Navigator: React.FC<{
  title: string;
  isExpanded: boolean;
  subMenuTitle: string;
  setIsExpanded: (value: boolean) => void;
}> = ({ title, isExpanded, setIsExpanded, subMenuTitle, children }) => {
  const menuSubPreset = {
    stylePreset: 'subMenu'
  };

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
          ...menuSubPreset,
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
        {children}
      </MenuSub>
    </Block>
  );
};

import React from 'react';
import { useTheme } from 'newskit';
import { SecondaryMenuOptions } from '../types';
import { MenuContainerMob, MenuSubMob } from '../styles';
import { ColouredText } from '../../../coloured-text';

export const Navigator: React.FC<{
  options: SecondaryMenuOptions;
  title: string;
  onClick?: (isExpanded: boolean) => void;
}> = ({ title, options, onClick }) => {
  const { isExpanded, setIsExpanded } = options;
  const theme = useTheme();

  return (
    <MenuContainerMob
      paddingInline="space045"
      isDefault={theme.name === 'times-web-light'}
      onClick={() => {
        setIsExpanded(!isExpanded);
        onClick && onClick(!isExpanded);
      }}
    >
      <ColouredText
        typographyPreset="utilitySubheading010"
        $color={theme.name === 'times-web-light' ? 'black' : 'white'}
      >
        {title}
      </ColouredText>
      <MenuSubMob
        expanded={isExpanded}
        aria-label={
          isExpanded ? 'Collapse Secondary Menu' : 'Expand Secondary Menu'
        }
        overrides={{
          paddingBlock: 'space000',
          paddingInline: 'space000',
          minHeight: 'sizing050',
          minWidth: 'sizing050',
          stylePreset: 'subMenuMob',
          indicatorIcon: {
            props: {
              overrides: {
                stylePreset: 'subMenuMobIcon'
              }
            }
          }
        }}
      >
        {null}
      </MenuSubMob>
    </MenuContainerMob>
  );
};

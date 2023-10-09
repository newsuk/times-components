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
    <MenuContainerMob paddingInline="space045">
      <ColouredText
        typographyPreset="utilitySubheading010"
        $color={theme.colors.sectionBrand060 && 'white'}
      >
        {title}
      </ColouredText>
      <MenuSubMob
        expanded={isExpanded}
        onClick={() => {
          setIsExpanded(!isExpanded);
          onClick && onClick(!isExpanded);
        }}
        aria-label={isExpanded ? "Collapse Sccondary Menu" : "Expand Sccondary Menu"}
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

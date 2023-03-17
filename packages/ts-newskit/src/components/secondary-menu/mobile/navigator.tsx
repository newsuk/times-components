import React from 'react';
import { MenuSub, TextBlock } from 'newskit';
import { SecondaryMenuOptions } from '../types';
import { StyledBlock } from '../styles';
import {
  subMenuStylePreset,
  secondaryNavMenuBlockStylePreset
} from '../../../theme/times-web-light/style-presets/secondary-nav';

export const Navigator: React.FC<{
  options: SecondaryMenuOptions;
  title: string;
  subMenuTitle: string;
}> = ({ title, options, subMenuTitle }) => {
  const { isExpanded, setIsExpanded } = options;

  return (
    <StyledBlock {...secondaryNavMenuBlockStylePreset}>
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
          ...subMenuStylePreset,
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

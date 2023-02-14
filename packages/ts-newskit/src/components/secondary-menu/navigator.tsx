import React from 'react';
import { MenuSub, TextBlock } from 'newskit';
import { MenuWrapper, TextBlockWrapper } from './styles';

export const Navigator: React.FC<{
  title: string;
  isExpanded: boolean;
  subMenuTitle: string;
  setIsExpanded: (value: boolean) => void;
}> = ({ title, isExpanded, setIsExpanded, subMenuTitle,children }) => {
  return (
    <>
      <MenuWrapper>
        <TextBlockWrapper>
          <TextBlock typographyPreset="utilityHeading060">{title}</TextBlock>
        </TextBlockWrapper>
        <MenuSub
          title={subMenuTitle}
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
          overrides={{ stylePreset: 'subMenu' }}
        >{children}</MenuSub>
      </MenuWrapper>
    </>
  );
};

import React, { useState, useEffect } from 'react';
import { SecondaryNavDesktop } from './desktop';
import { SecondaryNavMobile } from './mobile';
import { mainMenuItems } from './fixtures/menu-items.json';
import { Visible } from 'newskit';
import { SecondaryMenuItem } from './types';

export const SecondaryNav: React.FC<{
  title: string;
  isActive: boolean;
  data: SecondaryMenuItem[];
}> = ({ isActive = false, data }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(isActive);
  const [isSelected, setIsSelected] = useState<string>('');
  const firstItem = data[0].title;

  useEffect(() => {
    handleSelect('');
  }, []);

  const handleSelect = (title: string) => {
    const filteredItem = data.find(item => item.title === title);
    if (filteredItem) {
      setIsSelected(filteredItem.title);
      setIsExpanded(false);
    } else {
      setIsSelected(firstItem);
      setIsExpanded(isActive);
    }
  };

  return (
    <>
      <Visible sm xs>
        <SecondaryNavMobile
          data={mainMenuItems}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          isSelected={isSelected}
          handleSelect={handleSelect}
        />
      </Visible>
      <Visible md lg xl>
        <SecondaryNavDesktop
          data={mainMenuItems}
          isSelected={isSelected}
          handleSelect={handleSelect}
        />
      </Visible>
    </>
  );
};

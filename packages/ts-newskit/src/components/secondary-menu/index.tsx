import React, { useState, useEffect } from 'react';
import { SecondaryNavDesktop } from './desktop';
import { SecondaryNavMobile } from './mobile';
import { Visible } from 'newskit';
import { SecondaryMenuItem } from './types';

export const SecondaryNavigation: React.FC<{
  title: string;
  data: SecondaryMenuItem[];
}> = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<string>('');
  const firstItem = data[0].title;

  useEffect(() => {
    handleSelect('');
  }, []);

  const handleSelect = (title: string) => {
    const filteredItem = data.find(item => item.title === title);
    if (filteredItem) {
      setIsSelected(filteredItem.title);
    } else {
      setIsSelected(firstItem);
    }
  };

  const options = {
    isSelected,
    handleSelect,
    isExpanded,
    setIsExpanded
  };

  return (
    <>
      <Visible sm xs>
        <SecondaryNavMobile data={data} options={options} />
      </Visible>
      <Visible md lg xl>
        <SecondaryNavDesktop data={data} options={options} />
      </Visible>
    </>
  );
};

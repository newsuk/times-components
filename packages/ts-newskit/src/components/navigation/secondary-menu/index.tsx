import React, { useState, useEffect } from 'react';
import { SecondaryNavDesktop } from './desktop';
import { SecondaryNavMobile } from './mobile';
import { Visible } from 'newskit';
import { SecondaryMenuItem } from './types';

interface SecondaryNavigationProps {
  data: SecondaryMenuItem[];
  pageSlug: string;
}

export const SecondaryNavigation = ({
  data,
  pageSlug
}: SecondaryNavigationProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<string>('');
  const firstItem = data[0].title;

  useEffect(() => {
    handleSelect(pageSlug);
  }, []);

  const handleSelect = (slug: string) => {
    const filteredItem = data.find(item => item.slug === slug);
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

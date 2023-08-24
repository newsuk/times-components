import React, { useState, useEffect } from 'react';
import { SecondaryNavDesktop } from './desktop';
import { SecondaryNavMobile } from './mobile';
import { Visible } from 'newskit';
import { SecondaryMenuItem } from './types';
import { SecondaryNavContainer } from './styles';

interface SecondaryNavigationProps {
  data: SecondaryMenuItem[];
  pageSlug: string;
  stickyTop?: number;
  stickyTopDesktop?: number;
  onClick?: (isExpanded: boolean) => void;
}

export const SecondaryNavigation = ({
  data,
  pageSlug,
  stickyTopDesktop,
  stickyTop,
  onClick
}: SecondaryNavigationProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<string>('');

  useEffect(() => {
    handleSelect(pageSlug);
  }, []);

  const handleSelect = (slug: string) => {
    const filteredItem = data.find(item => item.slug === slug);

    if (!filteredItem) {
      return;
    }

    setIsSelected(filteredItem.title);
  };

  const options = {
    isSelected,
    handleSelect,
    isExpanded,
    setIsExpanded
  };

  return (
    <SecondaryNavContainer topDesktop={stickyTopDesktop} topMobile={stickyTop}>
      <Visible sm xs>
        <SecondaryNavMobile data={data} options={options} onClick={onClick} />
      </Visible>
      <Visible md lg xl>
        <SecondaryNavDesktop data={data} options={options} />
      </Visible>
    </SecondaryNavContainer>
  );
};

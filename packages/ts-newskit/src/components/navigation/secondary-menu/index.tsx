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
  defaultSelectedIndex?: number;
  heightMobile?: string;
}

export const SecondaryNavigation = ({
  data,
  pageSlug,
  stickyTopDesktop,
  stickyTop,
  onClick,
  defaultSelectedIndex = -1,
  heightMobile = 'auto'
}: SecondaryNavigationProps) => {
  const selectedItem =
    defaultSelectedIndex >= 0
      ? data[defaultSelectedIndex] && data[defaultSelectedIndex].title
      : '';
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<string>(selectedItem);

  useEffect(() => {
    handleSelect(pageSlug);
  }, []);

  const handleSelect = (slug: string) => {
    const filteredItem = data.find(item => item.slug === slug);

    if (!!filteredItem) {
      setIsSelected(filteredItem.title);
    }
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
        <SecondaryNavMobile
          data={data}
          options={options}
          onClick={onClick}
          height={heightMobile}
        />
      </Visible>
      <Visible md lg xl>
        <SecondaryNavDesktop data={data} options={options} />
      </Visible>
    </SecondaryNavContainer>
  );
};

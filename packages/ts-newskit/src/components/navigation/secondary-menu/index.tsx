import React, { useState } from 'react';
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
  clickHandler: (title: string) => void;
  defaultSelectedIndex?: number;
  heightMobile?: string;
}

export const SecondaryNavigation = ({
  data,
  pageSlug,
  stickyTopDesktop,
  stickyTop,
  onClick,
  clickHandler,
  defaultSelectedIndex = -1,
  heightMobile = 'auto'
}: SecondaryNavigationProps) => {
  const getPageTitle = (slug: string) => {
    const filteredItem = data.find(item => item.slug === slug);

    if (filteredItem) {
      return filteredItem.title;
    } else {
      return defaultSelectedIndex >= 0
        ? data[defaultSelectedIndex] && data[defaultSelectedIndex].title
        : '';
    }
  };

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<string>(getPageTitle(pageSlug));

  const handleSelect = (slug: string) => {
    setIsSelected(getPageTitle(slug));
  };

  const options = {
    isSelected,
    handleSelect,
    isExpanded,
    setIsExpanded
  };

  return (
    <SecondaryNavContainer
      topDesktop={stickyTopDesktop}
      topMobile={stickyTop && stickyTop - 0.5}
    >
      <Visible sm xs>
        <SecondaryNavMobile
          data={data}
          options={options}
          onClick={onClick}
          height={heightMobile}
          clickHandler={clickHandler}
        />
      </Visible>
      <Visible md lg xl>
        <SecondaryNavDesktop
          data={data}
          options={options}
          clickHandler={clickHandler}
        />
      </Visible>
    </SecondaryNavContainer>
  );
};

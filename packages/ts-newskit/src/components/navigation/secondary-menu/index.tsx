// IMPORTANT: This component is in the process of being moved to the main repository.
// Please avoid making any changes to this file for the time being.
// For updates or modifications, refer to the main repository once the move is complete.
// In case of emergencies, please reach out to reader-experience team for further assistance.

import React, { useState } from 'react';
import { SecondaryNavDesktop } from './desktop';
import { SecondaryNavMobile } from './mobile';
import { Visible } from 'newskit';
import { SecondaryMenuItem } from './types';
import { SecondaryNavContainer } from './styles';

interface SecondaryNavigationProps {
  data: SecondaryMenuItem[];
  pageSlug: string;
  title: string;
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
  title,
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
    <SecondaryNavContainer topDesktop={stickyTopDesktop} topMobile={stickyTop}>
      <Visible sm xs>
        <SecondaryNavMobile
          data={data}
          title={title}
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

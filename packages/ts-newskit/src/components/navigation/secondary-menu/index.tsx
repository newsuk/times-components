import React, { useState, useEffect } from 'react';
import { SecondaryNavDesktop } from './desktop';
import { SecondaryNavMobile } from './mobile';
import { Visible, useBreakpointKey } from 'newskit';
import { SecondaryMenuItem } from './types';
import { SecondaryNavContainer } from './styles';

interface SecondaryNavigationProps {
  data: SecondaryMenuItem[];
  pageSlug: string;
  isSticky?: boolean;
  stickyTop?: string;
  stickyTopInSmallScreen?: string
}

export const SecondaryNavigation = ({
  data,
  pageSlug,
  isSticky = false,
  stickyTop = '60px',
  stickyTopInSmallScreen = '110px'
}: SecondaryNavigationProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<string>('');

  const breakpoint = useBreakpointKey();
  const isSmallScreen = breakpoint === 'xs' || breakpoint === 'sm';

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
    <SecondaryNavContainer isSticky={isSticky} top={stickyTop} topInSmallScreen={stickyTopInSmallScreen} isSmallScreen={isSmallScreen}>
      <Visible sm xs>
        <SecondaryNavMobile data={data} options={options} />
      </Visible>
      <Visible md lg xl>
        <SecondaryNavDesktop data={data} options={options} />
      </Visible>
    </SecondaryNavContainer>
  );
};

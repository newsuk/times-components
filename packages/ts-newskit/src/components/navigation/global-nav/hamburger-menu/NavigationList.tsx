import React, { Fragment, useEffect } from 'react';
import { MenuDivider } from 'newskit';
import { MenuItemParent } from '../types';
import { StyledMenuSub, StyledMenuItem } from '../styles';

const NavigationList: React.FC<{
  data: MenuItemParent[];
  expandedL1?: string;
  onExpand?: (slug: string) => void;
  clickHandler: (title: string) => void;
}> = ({ data, expandedL1, onExpand, clickHandler }) => {
  const handleItemClick = (slug: string, title: string) => {
    if (onExpand) {
      expandedL1 !== slug ? onExpand(slug) : onExpand('');
    }
    clickHandler(title);
  };

  useEffect(() => {
    const [_domain, l1, l2] = window.location.pathname.split('/');

    const l1Menu = document.getElementById(`vertical-${l1}`);
    const l2Menu = document.getElementById(`vertical-sub-${l2}`);

    if (l2Menu) {
      l2Menu.classList.add('active');
      onExpand && onExpand(l1);
    } else if (l1Menu) {
      l1Menu.classList.add('active');
    }
  }, []);

  return (
    <>
      {data.map(
        item =>
          item.items ? (
            <Fragment key={item.slug}>
              <StyledMenuSub
                title={item.title}
                id={`vertical-${item.slug}`}
                expanded={expandedL1 === item.slug}
                onClick={() => handleItemClick(item.slug, item.title)}
                overrides={{
                  stylePreset: 'menuItemL1',
                  typographyPreset: 'newPreset040'
                }}
              >
                {item.items.map(({ slug, title, url }) => (
                  <Fragment key={`sub-${slug}`}>
                    <StyledMenuItem
                      key={item.slug}
                      href={url}
                      id={`vertical-sub-${slug}`}
                      overrides={{
                        paddingInlineStart: 'space060',
                        stylePreset: 'menuItemL2',
                        typographyPreset: 'newPreset040'
                      }}
                      onClick={() => clickHandler(title)}
                    >
                      {title}
                    </StyledMenuItem>
                    <MenuDivider />
                  </Fragment>
                ))}
              </StyledMenuSub>
              <MenuDivider />
            </Fragment>
          ) : (
            <Fragment key={item.slug}>
              <StyledMenuItem
                key={item.slug}
                href={item.url}
                id={`vertical-${item.slug}`}
                overrides={{
                  stylePreset: 'menuItemL1',
                  typographyPreset: 'newPreset040'
                }}
                onClick={() => clickHandler(item.title)}
              >
                {item.title}
              </StyledMenuItem>
              <MenuDivider />
            </Fragment>
          )
      )}
    </>
  );
};

export default NavigationList;

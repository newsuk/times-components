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

  const indicateActiveItem = (el: HTMLElement, slug?: string) => {
    el.classList.add('active');
    onExpand && slug && onExpand(slug);
  };

  useEffect(() => {
    const [_, l1, l2] = window.location.pathname.split('/');

    // Non nested L1
    const L1MenuItem = document.getElementById(`vertical-${l1}`);

    // nested L1
    const nestedL1MenuItem = document.getElementById(`vertical-sub-${l1}`);

    // L1 which has a sub menu
    const subL1MenuItem = document.getElementById(
      `vertical-sub-top-stories-${l1}`
    );

    const l2MenuItem = document.getElementById(`vertical-sub-${l2}`);

    if (l2MenuItem) {
      indicateActiveItem(l2MenuItem, l1);
    } else if (subL1MenuItem) {
      indicateActiveItem(subL1MenuItem, l1);
    } else if (L1MenuItem) {
      indicateActiveItem(L1MenuItem);
    } else if (nestedL1MenuItem) {
      const parentButton =
        nestedL1MenuItem.parentElement &&
        nestedL1MenuItem.parentElement.parentElement &&
        (nestedL1MenuItem.parentElement.parentElement
          .previousSibling as HTMLElement | null);

      const parentSlug = parentButton && parentButton.getAttribute('id');

      indicateActiveItem(
        nestedL1MenuItem,
        parentSlug ? parentSlug.slice(9) : undefined
      );
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
                  typographyPreset: 'newPreset040',
                  transitionPreset: {
                    extend: 'backgroundColorChange',
                    base: {
                      transitionDuration: '{{motions.motionDuration010}}'
                    }
                  }
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
                        typographyPreset: 'newPreset040',
                        transitionPreset: {
                          extend: 'backgroundColorChange',
                          base: {
                            transitionDuration: '{{motions.motionDuration010}}'
                          }
                        }
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
                  typographyPreset: 'newPreset040',
                  transitionPreset: {
                    extend: 'backgroundColorChange',
                    base: {
                      transitionDuration: '{{motions.motionDuration010}}'
                    }
                  }
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

import React, { Fragment } from 'react';
import { UnorderedList, LinkInline } from 'newskit';

type ListData = {
  label: string;
  href: string;
};

export interface ListDataProps {
  listData?: ListData[];
}

export const UnorderedListItems = ({ listData }: ListDataProps) => {
  if (!listData || listData.length === 0) {
    return null;
  }

  return (
    <UnorderedList
      overrides={{
        marker: {
          size: 'iconSize005',
          spaceInline: 'space020',
          stylePreset: 'inkContrast'
        },
        marginBlockStart: 'space050',
        content: {
          typographyPreset: 'utilityBody010'
        }
      }}
    >
      {listData.map(({ label, href }, index) => {
        const hasHref = !!href;
        return hasHref ? (
          <LinkInline
            overrides={{
              stylePreset: 'inkContrast'
            }}
            key={index}
            href={href}
          >
            {label}
          </LinkInline>
        ) : (
          <Fragment key={index}>{label}</Fragment>
        );
      })}
    </UnorderedList>
  );
};

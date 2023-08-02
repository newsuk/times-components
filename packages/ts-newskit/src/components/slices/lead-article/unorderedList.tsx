import React, { Fragment } from 'react';
import { UnorderedList, LinkInline } from 'newskit';
import { ClickHandlerType, MouseEventType } from '../../../slices/types';
import { articleClickTracking } from '../../../utils/tracking';

type ListData = {
  label: string;
  href: string;
  id: string;
};

export interface ListDataProps {
  listData?: ListData[];
  clickHandler: ClickHandlerType;
}

export const UnorderedListItems = ({
  listData,
  clickHandler
}: ListDataProps) => {
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
      {listData.map(({ label, href, id }, index) => {
        const onClick = (event: MouseEventType) => {
          const article = { headline: label, id, url: href };
          articleClickTracking(event, article, clickHandler);
        };
        const hasHref = !!href;
        return hasHref ? (
          <LinkInline
            overrides={{
              stylePreset: 'inkContrast'
            }}
            key={index}
            href={href}
            onClick={onClick}
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

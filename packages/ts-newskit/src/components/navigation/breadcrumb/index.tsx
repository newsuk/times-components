import React from 'react';
import { Breadcrumbs, BreadcrumbItem } from 'newskit';

type BreadcrumbsItem = {
  title: string;
  url?: string;
};

type BreadcrumbProps = {
  data: BreadcrumbsItem[];
  clickHandler: (title: string) => void;
};

export const Breadcrumb = ({ data, clickHandler }: BreadcrumbProps) => {
  return (
    <Breadcrumbs
      size="small"
      overrides={{
        separator: {
          stylePreset: 'breadcrumbSeparator'
        }
      }}
    >
      {data.map((breadcrumbItem, breadcrumbIndex, breadcrumbArr) => {
        const isLastItem = breadcrumbIndex + 1 === breadcrumbArr.length;
        return (
          <BreadcrumbItem
            key={breadcrumbItem.title}
            href={isLastItem ? undefined : breadcrumbItem.url}
            selected={isLastItem}
            overrides={{
              stylePreset: 'breadcrumbStyle',
              typographyPreset: 'breadcrumbText'
            }}
            onClick={() => !isLastItem && clickHandler(breadcrumbItem.title)}
          >
            {breadcrumbItem.title}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumbs>
  );
};

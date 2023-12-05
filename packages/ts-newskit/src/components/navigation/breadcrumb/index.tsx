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
      {data.map((breadcrumbItem, breadcrumbIndex, breadcrumbArr) => (
        <BreadcrumbItem
          key={breadcrumbItem.title}
          href={
            breadcrumbIndex + 1 === breadcrumbArr.length
              ? undefined
              : breadcrumbItem.url
          }
          selected={breadcrumbIndex + 1 === breadcrumbArr.length}
          overrides={{
            stylePreset: 'breadcrumbStyle',
            typographyPreset: 'breadcrumbText'
          }}
          onClick={() => {
            if (breadcrumbIndex + 1 !== breadcrumbArr.length) {
              clickHandler(breadcrumbItem.title);
            }
          }}
        >
          {breadcrumbItem.title}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
};

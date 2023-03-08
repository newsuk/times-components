import React from 'react';
import { Breadcrumbs, BreadcrumbItem } from 'newskit';

type BreadcrumbsItem = {
  title: string;
  url?: string;
};

interface BreadcrumbProps {
  data: BreadcrumbsItem[];
}

export const Breadcrumb = ({ data }: BreadcrumbProps) => {
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
        >
          {breadcrumbItem.title}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
};

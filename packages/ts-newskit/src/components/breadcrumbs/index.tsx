import React from 'react';
import { Breadcrumbs, BreadcrumbItem } from 'newskit';

export type BreadcrumbsItem = {
  title: string;
  url?: string;
};

export const Breadcrumb: React.FC<{ data: BreadcrumbsItem[] }> = ({ data }) => {
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

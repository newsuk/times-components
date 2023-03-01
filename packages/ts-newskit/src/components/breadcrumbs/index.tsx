import React from 'react';
import { Breadcrumbs, BreadcrumbItem } from 'newskit';
import { BreadcrumbsItem } from './types';

export const Breadcrumb: React.FC<{ data: BreadcrumbsItem[]; }> = ({ data }) => {
    return (
        <Breadcrumbs
            size="small"
            overrides={{
                stylePreset: 'breadcrumbStyle',
                separator: {
                  stylePreset: 'breadcrumbSeparator',
                },
            }}
        >
            {data.map((breadcrumbItem, breadcrumbIndex, breadcrumbArr) => (
                <BreadcrumbItem 
                    href={breadcrumbItem.url}
                    selected={breadcrumbIndex + 1 === breadcrumbArr.length}
                    overrides={{
                        typographyPreset: 'breadcrumbText',
                    }}
                >
                    {breadcrumbItem.title}
                </BreadcrumbItem>
            ))}
        </Breadcrumbs>
    );
};

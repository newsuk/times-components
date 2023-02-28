import React from 'react';
import { Breadcrumbs, BreadcrumbItem } from 'newskit';
import { BreadcrumbsItem } from './types';

export const Breadcrumb: React.FC<{ data: BreadcrumbsItem[]; }> = ({ data }) => {
    return (
        <Breadcrumbs size="small">
            {data.map(({ title, url }) => (
                <BreadcrumbItem
                href={url}
                overrides={{typographyPreset: 'breadcrumbText'}}
                >
                {title}
                </BreadcrumbItem> 
            ))}
            {/* {data.map((breadcrumbItem, breadcrumbIndex, breadcrumbArr) => {
                if (breadcrumbIndex + 1 === breadcrumbArr.length) {
                    <BreadcrumbItem
                    overrides={{
                        typographyPreset: 'breadcrumbCurrent'
                    }}
                    >{breadcrumbItem.title}</BreadcrumbItem>
                } else {
                    <BreadcrumbItem
                        href={breadcrumbItem.url}
                        overrides={{typographyPreset: 'breadcrumbText'}}
                        >
                        {breadcrumbItem.title}
                    </BreadcrumbItem> 
                }
            })} */}
        </Breadcrumbs>
    );
};

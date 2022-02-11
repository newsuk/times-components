import React from 'react';
import { storiesOf } from '@storybook/react';

import { ArticleHarness } from '../../fixtures/article-harness/ArticleHarness'; 
import { ArticleHeader } from './ArticleHeader';

storiesOf('Typescript Component/Article Header', module)
    .addDecorator((storyFn: () => React.ReactNode) => (
        <ArticleHarness>{storyFn()}</ArticleHarness>
    ))
    .add('Basic Article Header', () => (
        <ArticleHeader 
            updated='2022-02-11T09:30:00Z'
            breaking={true}
            headline='This%20is%20the%20headline'/>
    ))

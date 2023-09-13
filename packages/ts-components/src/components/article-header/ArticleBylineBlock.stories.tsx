import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { ArticleBylineBlock } from './ArticleBylineBlock';

const getAttributes = () => {
  const id = 'Options';

  const name = text('Name', 'Oliver Wright', id);
  const jobTitle = text('Job Title', 'Policy Editor', id);
  const image = text(
    'Image',
    'https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F043bbdb4-f8df-4856-92a4-132cc1524cb9.jpg?crop=668%2C668%2C0%2C0&resize=200',
    id
  );
  const description = text('Description', 'Analysis', id);

  return { name, jobTitle, image, description };
};

storiesOf('Typescript Component/Article Header', module).add(
  'Article Byline Block',
  () => {
    const props = getAttributes();
    return (
      <ArticleBylineBlock
        authorData={{
          slug: 'oliver-wright',
          name: props.name,
          jobTitle: props.jobTitle,
          image: props.image
        }}
        description={props.description}
      />
    );
  }
);

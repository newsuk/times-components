import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { ArticleBylineBlock } from '../ArticleBylineBlock';

describe('Article byline block', () => {
  const data = {
    slug: 'oliver-wright',
    name: 'Oliver Wright',
    jobTitle: 'Privacy Editor',
    image:
      'https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F043bbdb4-f8df-4856-92a4-132cc1524cb9.jpg?crop=668%2C668%2C0%2C0&resize=200'
  };
  const description = 'Analysis';

  it('Displays description', () => {
    const { getByText } = render(
      <ArticleBylineBlock authorData={undefined} description={description} />
    );

    expect(getByText(description)).toBeVisible();
  });

  it('Does not display the byline block component when no details exist', () => {
    const { queryByText } = render(<ArticleBylineBlock />);

    expect(queryByText(data.name)).not.toBeInTheDocument();
    expect(queryByText(description)).not.toBeInTheDocument();
  });

  it('Displays author details and description', () => {
    const { getByText, getByRole } = render(
      <ArticleBylineBlock authorData={data} description={description} />
    );
    expect(getByText(data.name)).toBeVisible();
    expect(getByText(data.jobTitle)).toBeVisible();
    const bylineImg = getByRole('img');
    expect(bylineImg).toHaveAttribute(
      'src',
      'https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F043bbdb4-f8df-4856-92a4-132cc1524cb9.jpg?crop=668%2C668%2C0%2C0&resize=200'
    );
  });
});

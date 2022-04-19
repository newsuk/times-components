//import React from 'react';
//import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('@times-components/ts-components', () => ({
  __esModule: true,
}));

describe('ArticleFlag', () => {


  it('does not render article flags if there are none', () => {
  //   const { baseElement } = render(
  //     <ArticleFlags flags={[]} longRead={false} withContainer={false} />
  //   );
  //   expect(baseElement).toMatchSnapshot();
  // });
});
})
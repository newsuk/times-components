import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  ArticleFlag,
  ArticleFlags,
  NewArticleFlag,
  UpdatedArticleFlag,
  ExclusiveArticleFlag,
  SponsoredArticleFlag,
  LongReadArticleFlag
} from '../ArticleFlag';
import mockDate from 'mockdate';

jest.mock('@times-components/ts-components', () => ({
  __esModule: true,
  ...jest.requireActual('@times-components/ts-components'),
  LiveArticleFlag: 'LiveArticleFlag'
}));

describe('ArticleFlag', () => {
  //  GMT: Thursday, 14 March 2019 16:22:54
  beforeEach(() => {
    mockDate.set(1552580574000);
  });

  afterEach(() => {
    mockDate.reset();
  });
  it('renders an article flag', () => {
    const { baseElement } = render(
      <ArticleFlag title="No Colour" color={''} />
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('renders a red article flag', () => {
    const { baseElement } = render(
      <ArticleFlag color="red" title="Coloured Red" />
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('renders the new article flag', () => {
    const { baseElement, getByText } = render(<NewArticleFlag />);
    expect(getByText('new')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });

  it('renders the updated article flag', () => {
    const { baseElement, getByText } = render(<UpdatedArticleFlag />);
    expect(getByText('updated')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });

  it('renders the exclusive article flag', () => {
    const { baseElement, getByText } = render(<ExclusiveArticleFlag />);
    expect(getByText('exclusive')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });

  it('renders the sponsored article flag', () => {
    const { baseElement, getByText } = render(<SponsoredArticleFlag />);
    expect(getByText('sponsored')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });

  it('renders the long read article flag', () => {
    const { baseElement, getByText } = render(<LongReadArticleFlag />);
    expect(getByText('long read')).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });

  it('renders multiple article flags', () => {
    const { baseElement } = render(
      <ArticleFlags
        flags={[
          { expiryTime: '2030-03-13T12:00:00.000Z', type: 'UPDATED' },
          { expiryTime: '2030-03-14T12:00:00.000Z', type: 'EXCLUSIVE' },
          { expiryTime: '2030-03-14T12:00:00.000Z', type: 'NEW' },
          { expiryTime: '2030-03-14T12:00:00.000Z', type: 'SPONSORED' }
        ]}
        longRead
        withContainer={false}
      />
    );
    expect(baseElement).toMatchSnapshot();
  });
  it('renders multiple article flags in a container', () => {
    const { baseElement } = render(
      <ArticleFlags
        flags={[
          { expiryTime: '2030-03-13T12:00:00.000Z', type: 'UPDATED' },
          { expiryTime: '2030-03-14T12:00:00.000Z', type: 'EXCLUSIVE' },
          { expiryTime: '2030-03-14T12:00:00.000Z', type: 'NEW' },
          { expiryTime: '2030-03-14T12:00:00.000Z', type: 'SPONSORED' }
        ]}
        longRead
        withContainer
      />
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('does not render article flags if there are none', () => {
    const { baseElement } = render(
      <ArticleFlags flags={[]} longRead={false} withContainer={false} />
    );
    expect(baseElement).toMatchSnapshot();
  });
});

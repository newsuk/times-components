import React from 'react';
import '@testing-library/jest-dom';
import { UnorderedListItems } from '../unorderedList';
import { renderComponent } from '../../../../utils';
import { ListData } from '../../../../slices/types';
import { fireEvent } from '@testing-library/react';

const mockClickHandler = jest.fn();
const LIST_DATA = [
  {
    label: 'one',
    href: '/one',
    id: 'one'
  },
  {
    label: 'two',
    href: undefined,
    id: 'two'
  }
] as ListData[];

const renderUnorderedListItems = () =>
  renderComponent(
    <UnorderedListItems listData={LIST_DATA} clickHandler={mockClickHandler} />
  );

describe('Render UnorderedListItems', () => {
  it('should render a snapshot', () => {
    const { asFragment } = renderUnorderedListItems();
    expect(asFragment()).toMatchSnapshot();
  });
  it('should triger even when clicking', () => {
    const { getAllByText } = renderUnorderedListItems();
    const label = getAllByText('one')[0];
    fireEvent.click(label);
    expect(mockClickHandler).toHaveBeenCalled();
  });
});

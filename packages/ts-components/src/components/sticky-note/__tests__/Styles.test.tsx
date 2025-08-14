// styles.test.tsx
import React from 'react';
import 'jest-styled-components';
import { render } from '@testing-library/react';
import {
  StickyNoteBox,
  StickyNoteHeader,
  Title,
  StickyNoteBody,
  Label,
  Info,
  MoreLink,
  StickyNotePointer,
  CloseButton
} from '../styles';

describe('StickyNote styles', () => {
  it('renders StickyNoteBox with correct styles', () => {
    const { container } = render(<StickyNoteBox />);
    expect(container.firstChild).toHaveStyleRule('position', 'absolute');
    expect(container.firstChild).toHaveStyleRule('top', '100px');
    expect(container.firstChild).toHaveStyleRule('z-index', '9999');
  });

  it('renders StickyNoteHeader with correct styles', () => {
    const { container } = render(<StickyNoteHeader />);
    expect(container.firstChild).toHaveStyleRule('padding', '26px 24px');
    expect(container.firstChild).toHaveStyleRule(
      'border-bottom',
      '1px solid #e4e4e4'
    );
  });

  it('renders Title with correct styles', () => {
    const { container } = render(<Title />);
    expect(container.firstChild).toHaveStyleRule('font-weight', '500');
    expect(container.firstChild).toHaveStyleRule('font-size', '18px');
  });

  it('renders StickyNoteBody with correct styles', () => {
    const { container } = render(<StickyNoteBody />);
    expect(container.firstChild).toHaveStyleRule('padding', '24px');
    expect(container.firstChild).toHaveStyleRule('display', 'flex');
    expect(container.firstChild).toHaveStyleRule('align-items', 'flex-start');
  });

  it('renders Label with correct styles', () => {
    const { container } = render(<Label />);
    expect(container.firstChild).toHaveStyleRule('border', '1px solid #bf0000');
    expect(container.firstChild).toHaveStyleRule('color', '#bf0000');
    expect(container.firstChild).toHaveStyleRule('text-transform', 'uppercase');
  });

  it('renders Info with correct styles', () => {
    const { container } = render(<Info />);
    expect(container.firstChild).toHaveStyleRule('font-size', '16px');
    expect(container.firstChild).toHaveStyleRule('line-height', '24px');
    expect(container.firstChild).toHaveStyleRule('color', '#3b3b3b');
  });

  it('renders MoreLink with correct styles', () => {
    const { container } = render(<MoreLink />);
    expect(container.firstChild).toHaveStyleRule('text-decoration', 'none');
    expect(container.firstChild).toHaveStyleRule('color', '#005c8a');
  });

  it('renders StickyNotePointer with correct styles', () => {
    const { container } = render(<StickyNotePointer />);
    expect(container.firstChild).toHaveStyleRule('width', '22px');
    expect(container.firstChild).toHaveStyleRule('height', '22px');
    expect(container.firstChild).toHaveStyleRule('transform', 'rotate(45deg)');
  });

  it('renders CloseButton with correct styles', () => {
    const { container } = render(<CloseButton />);
    expect(container.firstChild).toHaveStyleRule('background', 'none');
    expect(container.firstChild).toHaveStyleRule('border', 'none');
    expect(container.firstChild).toHaveStyleRule('cursor', 'pointer');
  });
});

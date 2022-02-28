import React from 'react';
import {render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { UpdatedTimestamp } from '../UpdatedTimestamp';
import MockDate from 'mockdate';

describe('UpdatedTimestamp', () => {
    const updated = '2022-02-28T11:30:00Z';
    afterEach(() => MockDate.reset());

    it('Within the first minute of update with a Live flag', () => {
     MockDate.set('2022-02-28T11:30:00Z');
     const {baseElement, getByText, queryByTestId } = render(
        <UpdatedTimestamp
            updatedTime={updated}
        />
     );   
        expect(baseElement).toMatchSnapshot();
        expect(getByText('BREAKING')).toBeVisible();
        expect(queryByTestId('TimeSinceUpdate')).toBeFalsy();
        expect(getByText('11.30am')).not.toBeVisible();
        expect(getByText('Updated')).toBeFalsy();
    })
});
    it('After the first minute of update with a Live flag', () => {
        
    })
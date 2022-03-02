import React from 'react';
import { storiesOf } from '@storybook/react';
import { date } from '@storybook/addon-knobs';

import { UpdatedTimestamp } from './UpdatedTimestamp';

storiesOf('Typescript Component/Updated Timestamp', module).add(
  'Updated Timestamp',
  () => {
    const label = 'Updated Date/Time';
    const defaultValue = new Date();
    const groupId = 'Options';
    const value = date(label, defaultValue, groupId);
    const updated = new Date(value).toISOString();

    return <UpdatedTimestamp updatedTime={updated} />;
  }
);

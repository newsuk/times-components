import React from 'react';
import { customToNewsKitIcon } from "newskit";
import TimesMasthead from './times-logo';

export const NewsKitTimesMasthead = customToNewsKitIcon(
    'NewskitTimesMasthead',
    props => <TimesMasthead {...props} />,
);

export { TimesMasthead };

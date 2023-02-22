import React from 'react';
import { customToNewsKitIcon } from "newskit";
import TimesMasthead from './times-logo';
import SundayTimesMasthead from './sunday-times-logo';

export const NewsKitTimesMasthead = customToNewsKitIcon('NewskitTimesMasthead', props => (
    <TimesMasthead {...props} />
));

export const NewsKitSundayTimesMasthead = customToNewsKitIcon('NewskitSundayTimesMasthead', props => (
    <SundayTimesMasthead {...props} />
));

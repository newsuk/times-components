import React from 'react';
import {
    differenceInSeconds,
    formatDistanceStrict
} from 'date-fns';

import { Container, TimeSinceUpdate } from './styles';

export const UpdatedTimestamp: React.FC<{
    updated: string;
    breaking?: string;
}> = ({ updated, breaking }) => {
    const currentDateTime = new Date();
    const updatedDate = new Date(updated);
    const timeSincePublishing =
    formatDistanceStrict(updatedDate, currentDateTime, {
      roundingMethod: 'floor'
    }) + ' ago';
    const diffInSeconds = differenceInSeconds(currentDateTime, updatedDate);

   const isLessThan1Minute = diffInSeconds < 60;
   const isLessThan13Hours = diffInSeconds < 60 * 60 * 13;

   const isBreaking = Boolean(breaking?.toLowerCase() === 'true');

    return (
        isBreaking ? (
            <Container>
            {!isLessThan1Minute && isLessThan13Hours ? (
                <TimeSinceUpdate>
                {`Updated `}{timeSincePublishing}
                </TimeSinceUpdate>
            ): null}
        </Container>
        ) : null
    )
}

import React from 'react';
import { format } from 'date-fns';
import differenceInSeconds from 'date-fns/difference_in_seconds';
import differenceInHours from 'date-fns/difference_in_hours'
import distanceInWordsStrict from 'date-fns/distance_in_words_strict';

import { BreakingArticleFlag } from '../article-flag/LiveArticleFlag';
import { Container, Divider, Headline, TimeSincePublishing, UpdatedDate, UpdatedTime, UpdatedTimeItems, UpdatesContainer } from './styles';

export const ArticleHeader: React.FC<{ updated: string; breaking: boolean, headline: string}> = ( { updated, breaking, headline }) => {
    const currentDateTime = new Date();
    const timeSincePublishing = distanceInWordsStrict(updated, currentDateTime, {partialMethod: 'floor'}) + ' ago';
    const secondsDifference = differenceInSeconds(currentDateTime, updated);
    const hoursDifference = differenceInHours(currentDateTime,updated);

    return (
        <Container>
            <UpdatesContainer>
                <UpdatedTimeItems>
                    {breaking ? <BreakingArticleFlag/>: null}
                    <TimeSincePublishing>
                        {secondsDifference > 59 && hoursDifference < 13
                        ? timeSincePublishing : null}
                    </TimeSincePublishing>
                    <Divider>
                        |
                    </Divider>
                    <UpdatedTime>
                        {format(updated, 'h.mma')}
                    </UpdatedTime>
                </UpdatedTimeItems>
                    <UpdatedDate>
                        February 9 2022
                    </UpdatedDate>
            </UpdatesContainer>
            <Headline>
                    {decodeURI(headline)}
            </Headline>
        </Container>
    
        )
}

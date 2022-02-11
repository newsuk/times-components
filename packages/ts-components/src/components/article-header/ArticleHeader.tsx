import React from 'react';
import { format, differenceInSeconds, differenceInHours, distanceInWordsStrict  } from 'date-fns';

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
                    {secondsDifference > 59 && hoursDifference < 13
                        ? '|' : null}
                    </Divider>
                    <UpdatedTime>
                        {format(updated, 'h.mma')}
                    </UpdatedTime>
                </UpdatedTimeItems>
                    <UpdatedDate>
                        {format(updated, 'MMMM D YYYY')}
                    </UpdatedDate>
            </UpdatesContainer>
            <Headline>
                    {decodeURI(headline)}
            </Headline>
        </Container>
    
        )
}

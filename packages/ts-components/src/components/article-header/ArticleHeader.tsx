import React from 'react';
import { format, differenceInSeconds, differenceInHours, distanceInWordsStrict, isYesterday } from 'date-fns';

import { BreakingArticleFlag } from '../article-flag/LiveArticleFlag';
import { Container, Divider, Headline, TimeSincePublishing, UpdatedDate, UpdatedTime, UpdatedTimeItems, UpdatesContainer } from './styles';

export const ArticleHeader: React.FC<{ updated: string; breaking: boolean, headline: string}> = ( { updated, breaking, headline }) => {
    const currentDateTime = new Date();
    const timeSincePublishing = distanceInWordsStrict(updated, currentDateTime, {partialMethod: 'floor'}) + ' ago';
    const secondsDifference = differenceInSeconds(currentDateTime, updated);
    const hoursDifference = differenceInHours(currentDateTime,updated);

    console.log('**hoursDifference', hoursDifference);

    const isBreaking = Boolean(breaking);
    
    return (
        <Container>
            <UpdatesContainer>
                <UpdatedTimeItems>
                    {breaking ? <BreakingArticleFlag/>: null}
                    <TimeSincePublishing isBreaking={isBreaking}>
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
                        {isYesterday(updated) ? format(updated, 'MMMM D YYYY') : null}
                    </UpdatedDate>
            </UpdatesContainer>
            <Headline>
                {decodeURI(headline)}
            </Headline>
        </Container>
    
        )
}

import React from 'react';
import { format } from 'date-fns';

import { BreakingArticleFlag } from '../article-flag/LiveArticleFlag';
import { Container, Divider, Headline, TimeSincePublishing, UpdatedDate, UpdatedTime, UpdatedTimeItems, UpdatesContainer } from './styles';

export const ArticleHeader: React.FC<{ updated: string; breaking: boolean, headline: string}> = ( { updated, breaking, headline }) => {

    return (
        <Container>
            <UpdatesContainer>
                <UpdatedTimeItems>
                    {breaking ? <BreakingArticleFlag/>: null}
                    <TimeSincePublishing>
                        Time
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

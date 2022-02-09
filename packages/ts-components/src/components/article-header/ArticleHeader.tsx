import React from 'react';

import { BreakingArticleFlag } from '../../'
import { Container, Divider, Headline, TimeSincePublishing, UpdatedDate, UpdatedTime, UpdatedTimeItems, UpdatesContainer } from './styles';

export const ArticleHeader: React.FC = () => {

    const breaking = true;

    return (
        <Container>
            <UpdatesContainer>
                <UpdatedTimeItems>
                    {breaking ? <BreakingArticleFlag/>: null}
                    <TimeSincePublishing>
                        10 minutes ago
                    </TimeSincePublishing>
                    <Divider>
                        |
                    </Divider>
                    <UpdatedTime>
                        11.25am
                    </UpdatedTime>
                </UpdatedTimeItems>
                    <UpdatedDate>
                        February 9 2022
                    </UpdatedDate>
            </UpdatesContainer>
            <Headline>
                    This is a headline that resizes at a breakpoint of 768px
            </Headline>
        </Container>
    
        )
}

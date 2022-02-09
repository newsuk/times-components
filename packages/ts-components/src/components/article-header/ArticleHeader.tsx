import React from 'react';
import { Container, Divider, Headline, TimeSincePublishing, UpdatedDate, UpdatedTime, UpdatedTimeItems, UpdatesContainer } from './styles';

export const ArticleHeader: React.FC = () => {
    return (
        <Container>
            <UpdatesContainer>
                <UpdatedTimeItems>
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

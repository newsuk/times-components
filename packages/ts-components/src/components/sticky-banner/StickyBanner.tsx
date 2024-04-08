import React, { FC } from "react";
import { CloseButton, Container, ContentContainer, Description, Header, IconContainer, Title } from "./styles";
import { EmailIcon } from "./emailIcon";
import { CloseIcon } from "./closeIcon";

type Props = {
    title: string;
}

export const StickyBanner: FC<Props> = ({ title, children }) => (
    <Container>
        <Header>
        <IconContainer>
            <EmailIcon />
            <Title>{title}</Title>
        </IconContainer>
        <CloseButton>
            <CloseIcon />
        </CloseButton>
        </Header>
        <ContentContainer>
            <Description>{children}</Description>
        </ContentContainer>
    </Container>
)


import React from 'react';
import { Question } from './types';
import { Container, Title, StyledAccordionGroup, SeeAll } from './styles';
import { Accordion } from 'newskit';

interface FaqProps {
  data: Question[];
}

export const Faq: React.FC<FaqProps> = ({ data }) => {
  return (
    <Container>
      <Title
        as="h2"
        typographyPreset="editorialSubheadline050"
        stylePreset="inkContrast"
        marginBlockEnd="space080"
      >
        All your questions answered
      </Title>
      <StyledAccordionGroup expandSingle>
        {data.map(({ question, answer }) => (
          <Accordion header={question}>{answer}</Accordion>
        ))}
      </StyledAccordionGroup>
      <SeeAll href="ddad">See All FAQs</SeeAll>
    </Container>
  );
};

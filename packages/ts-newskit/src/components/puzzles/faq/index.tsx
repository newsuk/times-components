import React from 'react';
import { Question } from './types';
import { Container, Title } from './styles';
import { Accordion, AccordionGroup } from 'newskit';

interface FaqProps {
  data: Question[];
}

export const Faq: React.FC<FaqProps> = ({ data }) => {
  return (
    <Container>
      <Title
        as="h2"
        typographyPreset="editorialHeadline050"
        stylePreset="inkContrast"
        marginBlockEnd="space080"
      >
        All your questions answered
      </Title>
      <AccordionGroup expandSingle>
        {data.map(({ question, answer }) => (
          <Accordion header={question}>{answer}</Accordion>
        ))}
      </AccordionGroup>
    </Container>
  );
};

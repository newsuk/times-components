import React, { FC } from 'react';
import { TextBlock, Stack, GridLayout } from 'newskit';
import { StyledPhoneIcon, StyledGridLayoutItem, PhoneLink } from './styles';

interface ContactUsItem {
  title: string;
  phone: string;
  hrs: string;
}

interface ContactUsProps {
  data: ContactUsItem[];
  header?: string;
}

export const ContactUs: FC<ContactUsProps> = ({ data, header }) => {
  return (
    <Stack
      flow="vertical-center"
      paddingBlock="space070"
      paddingInline={{ xs: 'space045', md: 'space050' }}
    >
      <TextBlock
        as="h2"
        typographyPreset="editorialSubheadline030"
        stylePreset="puzzlesCenterAlignedText"
      >
        {header ? header : 'Need more help?'}
      </TextBlock>

      <GridLayout
        columns={'repeat(1, 1fr)'}
        rowGap="space000"
        columnGap="space050"
        overrides={{
          marginBlockStart: 'space060',
          width: '100%',
          maxWidth: '560px'
        }}
      >
        {data.map(({ title, phone, hrs }) => (
          <PhoneLink
            href={`tel: ${phone}`}
            textOnly
            overrides={{
              stylePreset: 'contactuslink'
            }}
          >
            <StyledGridLayoutItem
              key={title}
              paddingBlock="space020"
              paddingInline="space050"
            >
              <TextBlock
                as="h3"
                typographyPreset="utilityHeading010"
                marginBlock="space040"
                stylePreset="inkContrast"
              >
                {title}
              </TextBlock>
              <StyledPhoneIcon color="#005C8A" />
              <TextBlock
                as="p"
                typographyPreset="utilityBody020"
                marginBlock="space040"
                stylePreset="inkBase"
              >
                {phone}
              </TextBlock>
              <TextBlock
                as="p"
                typographyPreset="utilityBody020"
                marginBlock="space040"
                stylePreset="inkBase"
              >
                {hrs}
              </TextBlock>
            </StyledGridLayoutItem>
          </PhoneLink>
        ))}
      </GridLayout>
    </Stack>
  );
};

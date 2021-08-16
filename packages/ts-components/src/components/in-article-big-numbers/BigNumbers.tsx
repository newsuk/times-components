import React, { useRef, useState, useEffect } from 'react';
import { Placeholder } from '@times-components/image';
import { useFetch } from '../../helpers/fetch/FetchProvider';
import { sanitiseCopy } from '../../helpers/text-formatting/SanitiseCopy';
import {
  PlaceholderContainer,
  Container,
  ContentContainer,
  Label,
  Headline,
  ListContainer,
  List,
  ListItem,
  Value,
  Copy,
  ReadMoreContainer,
  ReadMoreButton
} from './styles';

import { DeckData } from '../../helpers/fetch/types';

type BigNumbersData = {
  type: string;
  data: {
    copy: string;
  };
};

type BigNumbersDeckData = DeckData<never, BigNumbersData>;

export const BigNumbers: React.FC<{
  sectionColour: string;
}> = ({ sectionColour }) => {
  const { loading, error, data } = useFetch<BigNumbersDeckData>();

  if (loading) {
    return (
      <PlaceholderContainer>
        <Placeholder />
      </PlaceholderContainer>
    );
  }

  if (error || data === undefined) {
    return null;
  }

  const { headline, label } = data.fields;
  const infoCardData = data.body.data;
  const [readMore, setReadMore] = useState(false);
  const handleReadMore = () => {
    setReadMore(!readMore);
  };

  const readMoreRef = useRef<HTMLDivElement>(null);
  const [showReadMore, setShowReadMore] = useState(false);
  const maxHeight = 350;
  useEffect(() => {
    const listContainer = readMoreRef.current;
    if (listContainer) {
      setShowReadMore(listContainer.clientHeight > maxHeight);
    }
  }, []);

  return (
    <Container sectionColour={sectionColour}>
      <ContentContainer>
        <Label sectionColour={sectionColour}>{label}</Label>
        <Headline>{headline}</Headline>
        <ListContainer
          ref={readMoreRef}
          readMore={readMore}
          maxHeight={maxHeight}
          showReadMore={showReadMore}
        >
          <List>
            {infoCardData.map((row: BigNumbersData, index: number) => (
              /* <ListItem
                key={index}
                dangerouslySetInnerHTML={{
                  __html: sanitiseCopy(row.data.copy, ['b', 'i'])
                }}
              > */
              <ListItem>
                  <Value sectionColour={sectionColour}>$497.8m</Value>
                  <Copy>The number of people who turned in to the final president debate</Copy>
              </ListItem>
            ))}
          </List>
        </ListContainer>
      </ContentContainer>
      <ReadMoreContainer readMore={readMore} showReadMore={showReadMore}>
        <ReadMoreButton onClick={handleReadMore}>
          {readMore ? 'Collapse' : 'Read more'}
        </ReadMoreButton>
      </ReadMoreContainer>
    </Container>
  );
};

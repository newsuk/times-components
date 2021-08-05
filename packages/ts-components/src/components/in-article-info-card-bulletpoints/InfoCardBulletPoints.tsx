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
  ReadMoreContainer,
  ReadMoreButton
} from './styles';

import { DeckData } from '../../helpers/fetch/types';

type InfoCardData = {
  type: string;
  data: {
    copy: string;
  };
};

type InfoCardDeckData = DeckData<never, InfoCardData>;

export const InfoCardBulletPoints: React.FC<{
  sectionColour: string;
}> = ({ sectionColour }) => {
  const { loading, error, data } = useFetch<InfoCardDeckData>();

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
  const [showAll, setReadMore] = useState(false);
  const handleReadMore = () => {
    setReadMore(!showAll);
  };

  const readMoreRef = useRef<HTMLDivElement>();
  const [readMore, showReadMore] = useState(false);
  const maxHeight = 350;
  useEffect(() => {
    const listContainer = readMoreRef.current;
    if (listContainer) {
      showReadMore(listContainer.clientHeight > maxHeight);
    }
  }, []);

  return (
    <Container sectionColour={sectionColour}>
      <ContentContainer>
        <Label sectionColour={sectionColour}>{label}</Label>
        <Headline>{headline}</Headline>
        <ListContainer
          ref={readMoreRef}
          showAll={showAll}
          maxHeight={maxHeight}
          readMore={readMore}
        >
          <List>
            {infoCardData.map((row: any, index: number) => (
              <ListItem
                key={index}
                dangerouslySetInnerHTML={{
                  __html: sanitiseCopy(row.data.copy, ['b', 'i'])
                }}
              />
            ))}
          </List>
        </ListContainer>
      </ContentContainer>
      <ReadMoreContainer readMore={readMore} showAll={showAll}>
        <ReadMoreButton onClick={handleReadMore}>
          {showAll ? 'Collapse' : ' Read more'}
        </ReadMoreButton>
      </ReadMoreContainer>
    </Container>
  );
};

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
  NumberContainer,
  Copy,
  ReadMoreContainer,
  ReadMoreButton
} from './styles';

import { DeckData } from '../../helpers/fetch/types';

type BigNumbersData = {
  type: string;
  data: {
    number: number;
    copy: string;
  };
};

export enum Layout {
  Standard = '4043',
  Wide = '4042'
}

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

  const isStandard = (infoCardSize: Layout) => {
    return infoCardSize === Layout.Standard;
  };

  const isWide = (infoCardSize: Layout) => {
    return infoCardSize === Layout.Wide;
  };

  const { headline, label, size } = data.fields;
  const infoCardData = data.body.data;
  const [readMore, setReadMore] = useState(false);
  const handleReadMore = () => {
    setReadMore(!readMore);
  };

  const readMoreRef = useRef<HTMLDivElement>(null);
  const [showReadMore, setShowReadMore] = useState(false);
  const maxHeight = 200;
  useEffect(() => {
    const listContainer = readMoreRef.current;
    if (listContainer) {
      setShowReadMore(listContainer.clientHeight > maxHeight);
    }
  }, []);

  return (
    <Container
      sectionColour={sectionColour}
      isWide={isWide(size)}
      isStandard={isStandard(size)}
    >
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
              <ListItem key={index} isStandard={isStandard(size)}>
                <NumberContainer sectionColour={sectionColour}>
                  {row.data.number}
                </NumberContainer>
                <Copy
                  dangerouslySetInnerHTML={{
                    __html: sanitiseCopy(row.data.copy, ['b', 'i'])
                  }}
                />
              </ListItem>
            ))}
          </List>
        </ListContainer>
      </ContentContainer>
      <ReadMoreContainer readMore={readMore} showReadMore={showReadMore}>
        <ReadMoreButton onClick={handleReadMore}>
          {readMore ? 'Collapse' : 'Show all'}
        </ReadMoreButton>
      </ReadMoreContainer>
    </Container>
  );
};

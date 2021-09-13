import React, { useRef, useState, useEffect } from 'react';
import { Placeholder } from '@times-components/image';
import { useFetch } from '../../helpers/fetch/FetchProvider';
import { sanitiseCopy } from '../../helpers/text-formatting/SanitiseCopy';
import {
  Container,
  ContentContainer,
  Headline,
  ListContainer,
  List,
  ListItem,
  LeftPanel,
  RightPanel,
  Date,
  SubHeading,
  Copy,
  ShowAllContainer,
  ShowAllButton
} from './styles';
import { PlaceholderContainer, Label } from '../common-styles';
import { DeckData } from '../../helpers/fetch/types';

type TimelinesData = {
  type: string;
  data: {
    date: string;
    eventHeading: string;
    image: string;
    copy: string;
  };
};

type TimelinesDeckData = DeckData<never, TimelinesData>;

export const Timelines: React.FC<{
  sectionColour: string;
}> = ({ sectionColour }) => {
  const { loading, error, data } = useFetch<TimelinesDeckData>();

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
  const timelinesData = data.body.data;
  const [showAll, setShowAll] = useState(false);
  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  const showAllRef = useRef<HTMLDivElement>(null);
  const [displayShowAll, setShowShowAll] = useState(false);
  const maxHeight = 375;
  useEffect(() => {
    const listContainer = showAllRef.current;
    if (listContainer) {
      setShowShowAll(listContainer.clientHeight > maxHeight);
    }
  }, []);

  return (
    <Container sectionColour={sectionColour}>
      <ContentContainer>
        <Label sectionColour={sectionColour}>{label}</Label>
        {headline && <Headline>{headline}</Headline>}
        <ListContainer
          ref={showAllRef}
          showAll={showAll}
          maxHeight={maxHeight}
          displayShowAll={displayShowAll}
        >
          <List>
            {timelinesData.map((row: TimelinesData, index: number) => (
              <ListItem key={index}>
                <LeftPanel
                  sectionColour={sectionColour}
                  circularImage={row.data.image}
                >
                  {row.data.image && <img src={row.data.image} />}
                </LeftPanel>
                <RightPanel>
                  <Date sectionColour={sectionColour}>{row.data.date}</Date>
                  <SubHeading>{row.data.eventHeading}</SubHeading>
                  <Copy
                    dangerouslySetInnerHTML={{
                      __html: sanitiseCopy(row.data.copy, ['br', 'b', 'i'])
                    }}
                  />
                </RightPanel>
              </ListItem>
            ))}
          </List>
        </ListContainer>
      </ContentContainer>
      <ShowAllContainer showAll={showAll} displayShowAll={displayShowAll}>
        <ShowAllButton onClick={handleShowAll}>
          {showAll ? 'Collapse' : 'Show all'}
        </ShowAllButton>
      </ShowAllContainer>
    </Container>
  );
};

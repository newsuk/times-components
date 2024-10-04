import React, { useRef, useState, useEffect } from 'react';
import { Placeholder } from '@times-components/image';
import { useFetch } from '../../helpers/fetch/FetchProvider';
import {
  PlaceholderContainer,
} from '../common-styles';
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

declare global {
  interface Window {
    __tcfapi: (
      command: string,
      version: number,
      callback: (data: any, success: boolean) => void
    ) => void;
  }
}

export const TwitterEmbed: React.FC<{
  sectionColour: string;
}> = () => {
  const { loading, error, data } = useFetch<TimelinesDeckData>();
    console.log('window', window);

     useEffect(() => {
     if (window.__tcfapi) {
       window.__tcfapi('getCustomVendorConsents', 2, (data, success) => {
         if (success) {
           console.log('TCF API response:', data);
         } else {
           console.log('Error fetching TCF API data');
         }
       });
     } else {
       console.log('TCF API not available');
     }
   }, []);

   console.log('window.__tcfapi', window.__tcfapi);

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

  const showAllRef = useRef<HTMLDivElement>(null);
  const [, setShowShowAll] = useState(false);
  const maxHeight = 375;
  useEffect(() => {
    const listContainer = showAllRef.current;
    if (listContainer) {
      setShowShowAll(listContainer.clientHeight > maxHeight);
    }
  }, []);

  return (
    <h1>Test</h1>
  );
};

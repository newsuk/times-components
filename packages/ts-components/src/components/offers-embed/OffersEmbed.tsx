import React, { useEffect } from 'react';
// @ts-ignore
import InteractiveWrapper from '@times-components/interactive-wrapper';

export declare type OffersEmbedProps = {
  element: any;
  url: string;
  vendorName: string;
  id: string;
};

declare global {
  interface Window {
    __tcfapi?: (
      command: string,
      version: number,
      callback: (data: any, success: boolean) => void
    ) => void;
  }
}

export const OffersEmbed: React.FC<OffersEmbedProps> = ({
  element,
  url,
  id
}) => {
  useEffect(
    () => {
      const wrapperId = `interactiveWrapper`;
      const interactiveWrapper = document.getElementById(wrapperId);
      const isBestSellingHolidays = element.attributes.src.includes(
        'best-selling-holidays'
      );

      if (interactiveWrapper) {
        interactiveWrapper.innerHTML = '';
        if (isBestSellingHolidays) {
          const travelOffersLink = document.createElement('link');
          travelOffersLink.href =
            'https://components.timesdev.tools/lib2/times-travel-offers-new-1.0.0/times-travel-offers-new.html';
          travelOffersLink.rel = 'import';
          document.head.appendChild(travelOffersLink);

          const travelOffersComponent = document.createElement(
            'times-travel-offers-new'
          );
          travelOffersComponent.setAttribute(
            'src',
            'https://components.timesdev.tools/lib2/times-travel-offers-new-1.0.0/times-travel-offers-new.html'
          );
          travelOffersComponent.setAttribute('offers', 'bsh');
          travelOffersComponent.setAttribute('title', 'Bestselling holidays');
          travelOffersComponent.setAttribute(
            'description',
            'Brought to you by Times Travel.'
          );

          interactiveWrapper.appendChild(travelOffersComponent);
        }
      }
    },
    [element, url, id]
  );

  return <div id="interactiveWrapper" />;
};

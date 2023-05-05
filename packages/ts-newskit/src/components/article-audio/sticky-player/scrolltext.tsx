import React, { useEffect, useRef, useState } from 'react';
import { debounce, getWidth } from '../../../utils';
import { ScrollText, ScrollTextItem } from '../styles';

export const ScrollingText: React.FC = ({ children }) => {
  const [scrollTextWidth, setScrollTextWidth] = useState<number>(200);
  const scrollText = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const scrollWidthVal: number = getWidth(scrollText.current);
      const textWidth = scrollWidthVal < 50 ? 200 : scrollWidthVal;
      setScrollTextWidth(textWidth + 40);
    };

    window.addEventListener('resize', debounce(handleResize, 500));
    handleResize();

    return () => {
      window.removeEventListener('resize', debounce(handleResize, 500));
    };
  }, []);

  const textItem = (
    <ScrollTextItem
      marginInlineEnd="space070"
      typographyPreset="utilityHeading010"
      ref={scrollText}
      style={{ width: `${scrollTextWidth}px` }}
    >
      {children}
    </ScrollTextItem>
  );

  return (
    <ScrollText style={{ width: `${scrollTextWidth * 2}px` }}>
      {textItem}
      {textItem}
    </ScrollText>
  );
};

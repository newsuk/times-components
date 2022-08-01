import React from 'react';

import { SliceData } from '../types/slice';
import { SliceStyle } from '../types/styles';
import { ClickHandlerType } from '../types/event';

import Lead1 from '../components/slices/Lead1/Lead1';
import Lead1And1 from '../components/slices/Lead1And1/Lead1And1';
import Lead1And2 from '../components/slices/Lead1And2/Lead1And2';
import Lead1And3Reversed from '../components/slices/Lead1And3Reversed/Lead1And3Reversed';
import Lead2 from '../components/slices/Lead2/Lead2';
import Secondary2And2 from '../components/slices/Secondary2And2/Secondary2And2';
import Secondary2And3 from '../components/slices/Secondary2And3/Secondary2And3';
import Secondary2And3NoPic from '../components/slices/Secondary2And3NoPic/Secondary2And3NoPic';
import Secondary3 from '../components/slices/Secondary3/Secondary3';
import Secondary4 from '../components/slices/Secondary4/Secondary4';
import Secondary4Odd from '../components/slices/Secondary4Odd/Secondary4Odd';
import Secondary10 from '../components/slices/Secondary10/Secondary10';
import RelatedArticle1 from '../components/slices/RelatedArticle1/RelatedArticle1';
import RelatedArticle2 from '../components/slices/RelatedArticle2/RelatedArticle2';
import RelatedArticle3 from '../components/slices/RelatedArticle3/RelatedArticle3';

export const getSliceComponent = (
  name: string
): React.FC<{
  slice: SliceData;
  styles?: SliceStyle;
  clickHandler?: ClickHandlerType;
}> => {
  switch (name) {
    case 'LEAD_1':
    case 'LEAD_1_COMPONENT':
    case 'INTERACTIVE_FULL_WIDTH':
      return Lead1;
    case 'LEAD_1_AND_1':
    case 'LEAD_1_AND_1_COMPONENT':
      return Lead1And1;
    case 'LEAD_1_AND_2':
    case 'LEAD_1_AND_2_COLUMNIST':
      return Lead1And2;
    case 'LEAD_1_AND_3_REVERSED':
      return Lead1And3Reversed;
    case 'LEAD_2':
    case 'LEAD_2_COMPONENT':
    case 'INTERACTIVE_HALF_WIDTH':
      return Lead2;
    case 'SECONDARY_2_AND_2':
      return Secondary2And2;
    case 'SECONDARY_2_AND_3':
      return Secondary2And3;
    case 'SECONDARY_2_AND_3_NO_PIC':
      return Secondary2And3NoPic;
    case 'SECONDARY_3':
      return Secondary3;
    case 'SECONDARY_4':
      return Secondary4;
    case 'SECONDARY_4_ODD':
    case 'SECONDARY_4_ODD_COLUMNIST':
      return Secondary4Odd;
    case 'SECONDARY_10':
      return Secondary10;
    case 'RELATED_ARTICLE_1':
      return RelatedArticle1;
    case 'RELATED_ARTICLE_2':
      return RelatedArticle2;
    case 'RELATED_ARTICLE_3':
      return RelatedArticle3;

    default:
      return () => null;
  }
};

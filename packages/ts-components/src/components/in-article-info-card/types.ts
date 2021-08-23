import { DeckData } from "../../helpers/fetch/types";

export type InfoCardData = {
    type: string;
    data: {
      image?: string;
      subtitle?: string;
      copy: string;
      author: string;
    };
  };
  type InfoCardFields = { headline: string; label: string; size: Layout };
  
  export type InfoCardDeckData = DeckData<InfoCardFields, InfoCardData>;
  
  export enum Layout {
    Standard = '4043',
    Wide = '4042'
  }
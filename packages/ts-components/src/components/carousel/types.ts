export type DataObj = {
  deck_id: number;
  deck_name: string;
  deck_type: string;
  version: number;
  updated_at: {
    date: string;
    timezone_type: number;
    timezone: string;
  };
  fields: FieldsObj;
  body: {
    data: CarouselDataObj[];
  };
  html: string;
};

export type FieldsObj = {
  label: string;
  headline: string;
  size: string;
};

export type CarouselDataObj = {
  type: string;
  data: {
    image: string;
    credit: string;
    imageTitle?: string;
    copy?: string;
  };
};

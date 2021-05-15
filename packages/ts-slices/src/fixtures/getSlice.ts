import { SliceData } from '../types/slice';

import {
  getArticle,
  getArticleWithSummary,
  getCommentArticle
} from './getArticle';

const slices: SliceData[] = [
  {
    name: 'LEAD_1',
    children: [{ article: getArticleWithSummary() }]
  },
  {
    name: 'LEAD_1_AND_1',
    children: [{ article: getArticle() }, { article: getArticleWithSummary() }]
  },
  {
    name: 'LEAD_1_AND_2',
    children: [
      { article: getArticle() },
      { article: getArticle() },
      { article: getArticle() }
    ]
  },
  {
    name: 'LEAD_1_AND_2_COLUMNIST',
    children: [
      { article: getArticle() },
      { article: getArticle() },
      { article: getCommentArticle() }
    ]
  },
  {
    name: 'LEAD_1_AND_3_REVERSED',
    children: [
      { article: getArticle() },
      { article: getArticle() },
      { article: getArticle() },
      { article: getArticle() }
    ]
  },
  {
    name: 'LEAD_2',
    children: [{ article: getArticle() }, { article: getArticle() }]
  },
  {
    name: 'SECONDARY_2_AND_2',
    children: [
      { article: getArticle() },
      { article: getArticle() },
      { article: getCommentArticle() },
      { article: getArticle() }
    ]
  },
  {
    name: 'SECONDARY_2_AND_3',
    children: [
      { article: getArticle() },
      { article: getArticle() },
      { article: getArticle() },
      { article: getArticle() },
      { article: getArticle() }
    ]
  },
  {
    name: 'SECONDARY_2_AND_3_NO_PIC',
    children: [
      { article: getArticle() },
      { article: getArticle() },
      { article: getArticle() },
      { article: getArticle() },
      { article: getArticle() }
    ]
  },
  {
    name: 'SECONDARY_3',
    children: [
      { article: getArticleWithSummary() },
      { article: getArticleWithSummary() },
      { article: getArticleWithSummary() }
    ]
  },
  {
    name: 'SECONDARY_4',
    children: [
      { article: getArticle() },
      { article: getArticle() },
      { article: getArticle() },
      { article: getArticle() }
    ]
  },
  {
    name: 'SECONDARY_4_ODD',
    children: [
      { article: getArticle() },
      { article: getArticle() },
      { article: getArticle() },
      { article: getArticle() }
    ]
  },
  {
    name: 'SECONDARY_4_ODD_COLUMNIST',
    children: [
      { article: getArticle() },
      { article: getCommentArticle() },
      { article: getArticle() },
      { article: getCommentArticle() }
    ]
  },
  {
    name: 'SECONDARY_10',
    children: [
      { article: getArticle() },
      { article: getArticle() },
      { article: getArticle() },
      { article: getArticle() },
      { article: getArticle() },
      { article: getArticle() },
      { article: getArticle() },
      { article: getArticle() },
      { article: getArticle() },
      { article: getArticle() }
    ]
  }
];

export const getSlice = (name: string) => {
  const slice = slices.find((s: SliceData) => s.name === name);
  return slice ? slice : { name: 'UNDEFINED', children: [] };
};

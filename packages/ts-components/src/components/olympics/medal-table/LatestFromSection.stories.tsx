import React from 'react';

import { storiesOf } from '@storybook/react';

import { MedalTable, MedalTableData } from './MedalTable';
import { TrackingContextProvider } from '../../../helpers/tracking/TrackingContextProvider';
import analyticsStream from '../../../fixtures/analytics-actions/analytics-actions';
import { ArticleHarness } from '../../../fixtures/article-harness/ArticleHarness';

const data: MedalTableData = {
  total: 220,
  item: [
    {
      rank: 1,
      organisation: { description: 'United States', code: 'USA' },
      medals: { gold: 46, silver: 37, bronze: 38, total: 121 }
    },
    {
      rank: 2,
      organisation: { description: 'Great Britain', code: 'GBR' },
      medals: { gold: 27, silver: 23, bronze: 17, total: 67 }
    },
    {
      rank: 3,
      organisation: { description: 'China', code: 'CHN' },
      medals: { gold: 26, silver: 18, bronze: 26, total: 70 }
    },
    {
      rank: 4,
      organisation: { description: 'Russia', code: 'RUS' },
      medals: { gold: 19, silver: 17, bronze: 20, total: 56 }
    },
    {
      rank: 5,
      organisation: { description: 'Germany', code: 'GER' },
      medals: { gold: 17, silver: 10, bronze: 15, total: 42 }
    },
    {
      rank: 6,
      organisation: { description: 'Japan', code: 'JPN' },
      medals: { gold: 12, silver: 8, bronze: 21, total: 41 }
    },
    {
      rank: 7,
      organisation: { description: 'France', code: 'FRA' },
      medals: { gold: 10, silver: 18, bronze: 14, total: 42 }
    },
    {
      rank: 8,
      organisation: { description: 'South Korea', code: 'KOR' },
      medals: { gold: 9, silver: 3, bronze: 9, total: 21 }
    },
    {
      rank: 9,
      organisation: { description: 'Italy', code: 'ITA' },
      medals: { gold: 8, silver: 12, bronze: 8, total: 28 }
    },
    {
      rank: 10,
      organisation: { description: 'Australia', code: 'AUS' },
      medals: { gold: 8, silver: 11, bronze: 10, total: 29 }
    },
    {
      rank: 11,
      organisation: { description: 'Netherlands', code: 'NED' },
      medals: { gold: 8, silver: 7, bronze: 4, total: 19 }
    },
    {
      rank: 12,
      organisation: { description: 'Hungary', code: 'HUN' },
      medals: { gold: 8, silver: 3, bronze: 4, total: 15 }
    },
    {
      rank: 13,
      organisation: { description: 'Brazil', code: 'BRA*' },
      medals: { gold: 7, silver: 6, bronze: 6, total: 19 }
    },
    {
      rank: 14,
      organisation: { description: 'Spain', code: 'ESP' },
      medals: { gold: 7, silver: 4, bronze: 6, total: 17 }
    },
    {
      rank: 15,
      organisation: { description: 'Kenya', code: 'KEN' },
      medals: { gold: 6, silver: 6, bronze: 1, total: 13 }
    },
    {
      rank: 16,
      organisation: { description: 'Jamaica', code: 'JAM' },
      medals: { gold: 6, silver: 3, bronze: 2, total: 11 }
    },
    {
      rank: 17,
      organisation: { description: 'Croatia', code: 'CRO' },
      medals: { gold: 5, silver: 3, bronze: 2, total: 10 }
    },
    {
      rank: 18,
      organisation: { description: 'Cuba', code: 'CUB' },
      medals: { gold: 5, silver: 2, bronze: 4, total: 11 }
    },
    {
      rank: 19,
      organisation: { description: 'New Zealand', code: 'NZL' },
      medals: { gold: 4, silver: 9, bronze: 5, total: 18 }
    },
    {
      rank: 20,
      organisation: { description: 'Canada', code: 'CAN' },
      medals: { gold: 4, silver: 3, bronze: 15, total: 22 }
    },
    {
      rank: 21,
      organisation: { description: 'Uzbekistan', code: 'UZB' },
      medals: { gold: 4, silver: 2, bronze: 7, total: 13 }
    },
    {
      rank: 22,
      organisation: { description: 'Kazakhstan', code: 'KAZ' },
      medals: { gold: 3, silver: 5, bronze: 10, total: 18 }
    },
    {
      rank: 23,
      organisation: { description: 'Colombia', code: 'COL' },
      medals: { gold: 3, silver: 2, bronze: 3, total: 8 }
    },
    {
      rank: 24,
      organisation: { description: 'Switzerland', code: 'SUI' },
      medals: { gold: 3, silver: 2, bronze: 2, total: 7 }
    },
    {
      rank: 25,
      organisation: { description: 'Iran', code: 'IRI' },
      medals: { gold: 3, silver: 1, bronze: 4, total: 8 }
    },
    {
      rank: 26,
      organisation: { description: 'Greece', code: 'GRE' },
      medals: { gold: 3, silver: 1, bronze: 2, total: 6 }
    },
    {
      rank: 27,
      organisation: { description: 'Argentina', code: 'ARG' },
      medals: { gold: 3, silver: 1, bronze: 0, total: 4 }
    },
    {
      rank: 28,
      organisation: { description: 'Denmark', code: 'DEN' },
      medals: { gold: 2, silver: 6, bronze: 7, total: 15 }
    },
    {
      rank: 29,
      organisation: { description: 'Sweden', code: 'SWE' },
      medals: { gold: 2, silver: 6, bronze: 3, total: 11 }
    },
    {
      rank: 30,
      organisation: { description: 'South Africa', code: 'RSA' },
      medals: { gold: 2, silver: 6, bronze: 2, total: 10 }
    },
    {
      rank: 31,
      organisation: { description: 'Ukraine', code: 'UKR' },
      medals: { gold: 2, silver: 5, bronze: 4, total: 11 }
    },
    {
      rank: 32,
      organisation: { description: 'Serbia', code: 'SRB' },
      medals: { gold: 2, silver: 4, bronze: 2, total: 8 }
    },
    {
      rank: 33,
      organisation: { description: 'Poland', code: 'POL' },
      medals: { gold: 2, silver: 3, bronze: 6, total: 11 }
    },
    {
      rank: 34,
      organisation: { description: 'North Korea', code: 'PRK' },
      medals: { gold: 2, silver: 3, bronze: 2, total: 7 }
    },
    {
      rank: 35,
      organisation: { description: 'Belgium', code: 'BEL' },
      medals: { gold: 2, silver: 2, bronze: 2, total: 6 }
    },
    {
      rank: 35,
      organisation: { description: 'Thailand', code: 'THA' },
      medals: { gold: 2, silver: 2, bronze: 2, total: 6 }
    },
    {
      rank: 37,
      organisation: { description: 'Slovakia', code: 'SVK' },
      medals: { gold: 2, silver: 2, bronze: 0, total: 4 }
    },
    {
      rank: 38,
      organisation: { description: 'Georgia', code: 'GEO' },
      medals: { gold: 2, silver: 1, bronze: 4, total: 7 }
    },
    {
      rank: 39,
      organisation: { description: 'Azerbaijan', code: 'AZE' },
      medals: { gold: 1, silver: 7, bronze: 10, total: 18 }
    },
    {
      rank: 40,
      organisation: { description: 'Belarus', code: 'BLR' },
      medals: { gold: 1, silver: 4, bronze: 4, total: 9 }
    },
    {
      rank: 41,
      organisation: { description: 'Turkey', code: 'TUR' },
      medals: { gold: 1, silver: 3, bronze: 4, total: 8 }
    },
    {
      rank: 42,
      organisation: { description: 'Armenia', code: 'ARM' },
      medals: { gold: 1, silver: 3, bronze: 0, total: 4 }
    },
    {
      rank: 43,
      organisation: { description: 'Czech Republic', code: 'CZE' },
      medals: { gold: 1, silver: 2, bronze: 7, total: 10 }
    },
    {
      rank: 44,
      organisation: { description: 'Ethiopia', code: 'ETH' },
      medals: { gold: 1, silver: 2, bronze: 5, total: 8 }
    },
    {
      rank: 45,
      organisation: { description: 'Slovenia', code: 'SLO' },
      medals: { gold: 1, silver: 2, bronze: 1, total: 4 }
    },
    {
      rank: 46,
      organisation: { description: 'Indonesia', code: 'INA' },
      medals: { gold: 1, silver: 2, bronze: 0, total: 3 }
    },
    {
      rank: 47,
      organisation: { description: 'Romania', code: 'ROU' },
      medals: { gold: 1, silver: 1, bronze: 2, total: 4 }
    },
    {
      rank: 48,
      organisation: { description: 'Bahrain', code: 'BRN' },
      medals: { gold: 1, silver: 1, bronze: 0, total: 2 }
    },
    {
      rank: 48,
      organisation: { description: 'Vietnam', code: 'VIE' },
      medals: { gold: 1, silver: 1, bronze: 0, total: 2 }
    },
    {
      rank: 50,
      organisation: { description: 'Chinese Taipei', code: 'TPE' },
      medals: { gold: 1, silver: 0, bronze: 2, total: 3 }
    },
    {
      rank: 51,
      organisation: { description: 'Bahamas', code: 'BAH' },
      medals: { gold: 1, silver: 0, bronze: 1, total: 2 }
    },
    {
      rank: 51,
      organisation: {
        description: 'Independent Olympic Athletes',
        code: 'IOA'
      },
      medals: { gold: 1, silver: 0, bronze: 1, total: 2 }
    },
    {
      rank: 51,
      organisation: { description: 'Ivory Coast', code: 'CIV' },
      medals: { gold: 1, silver: 0, bronze: 1, total: 2 }
    },
    {
      rank: 54,
      organisation: { description: 'Fiji', code: 'FIJ' },
      medals: { gold: 1, silver: 0, bronze: 0, total: 1 }
    },
    {
      rank: 54,
      organisation: { description: 'Jordan', code: 'JOR' },
      medals: { gold: 1, silver: 0, bronze: 0, total: 1 }
    },
    {
      rank: 54,
      organisation: { description: 'Kosovo', code: 'KOS' },
      medals: { gold: 1, silver: 0, bronze: 0, total: 1 }
    },
    {
      rank: 54,
      organisation: { description: 'Puerto Rico', code: 'PUR' },
      medals: { gold: 1, silver: 0, bronze: 0, total: 1 }
    },
    {
      rank: 54,
      organisation: { description: 'Singapore', code: 'SIN' },
      medals: { gold: 1, silver: 0, bronze: 0, total: 1 }
    },
    {
      rank: 54,
      organisation: { description: 'Tajikistan', code: 'TJK' },
      medals: { gold: 1, silver: 0, bronze: 0, total: 1 }
    },
    {
      rank: 60,
      organisation: { description: 'Malaysia', code: 'MAS' },
      medals: { gold: 0, silver: 4, bronze: 1, total: 5 }
    },
    {
      rank: 61,
      organisation: { description: 'Mexico', code: 'MEX' },
      medals: { gold: 0, silver: 3, bronze: 2, total: 5 }
    },
    {
      rank: 62,
      organisation: { description: 'Venezuela', code: 'VEN' },
      medals: { gold: 0, silver: 2, bronze: 1, total: 3 }
    },
    {
      rank: 63,
      organisation: { description: 'Algeria', code: 'ALG' },
      medals: { gold: 0, silver: 2, bronze: 0, total: 2 }
    },
    {
      rank: 63,
      organisation: { description: 'Ireland', code: 'IRL' },
      medals: { gold: 0, silver: 2, bronze: 0, total: 2 }
    },
    {
      rank: 65,
      organisation: { description: 'Lithuania', code: 'LTU' },
      medals: { gold: 0, silver: 1, bronze: 3, total: 4 }
    },
    {
      rank: 66,
      organisation: { description: 'Bulgaria', code: 'BUL' },
      medals: { gold: 0, silver: 1, bronze: 2, total: 3 }
    },
    {
      rank: 67,
      organisation: { description: 'India', code: 'IND' },
      medals: { gold: 0, silver: 1, bronze: 1, total: 2 }
    },
    {
      rank: 67,
      organisation: { description: 'Mongolia', code: 'MGL' },
      medals: { gold: 0, silver: 1, bronze: 1, total: 2 }
    },
    {
      rank: 69,
      organisation: { description: 'Burundi', code: 'BDI' },
      medals: { gold: 0, silver: 1, bronze: 0, total: 1 }
    },
    {
      rank: 69,
      organisation: { description: 'Grenada', code: 'GRN' },
      medals: { gold: 0, silver: 1, bronze: 0, total: 1 }
    },
    {
      rank: 69,
      organisation: { description: 'Niger', code: 'NIG' },
      medals: { gold: 0, silver: 1, bronze: 0, total: 1 }
    },
    {
      rank: 69,
      organisation: { description: 'Philippines', code: 'PHI' },
      medals: { gold: 0, silver: 1, bronze: 0, total: 1 }
    },
    {
      rank: 69,
      organisation: { description: 'Qatar', code: 'QAT' },
      medals: { gold: 0, silver: 1, bronze: 0, total: 1 }
    },
    {
      rank: 74,
      organisation: { description: 'Norway', code: 'NOR' },
      medals: { gold: 0, silver: 0, bronze: 4, total: 4 }
    },
    {
      rank: 75,
      organisation: { description: 'Egypt', code: 'EGY' },
      medals: { gold: 0, silver: 0, bronze: 3, total: 3 }
    },
    {
      rank: 75,
      organisation: { description: 'Tunisia', code: 'TUN' },
      medals: { gold: 0, silver: 0, bronze: 3, total: 3 }
    },
    {
      rank: 77,
      organisation: { description: 'Israel', code: 'ISR' },
      medals: { gold: 0, silver: 0, bronze: 2, total: 2 }
    },
    {
      rank: 78,
      organisation: { description: 'Austria', code: 'AUT' },
      medals: { gold: 0, silver: 0, bronze: 1, total: 1 }
    },
    {
      rank: 78,
      organisation: { description: 'Dominican Republic', code: 'DOM' },
      medals: { gold: 0, silver: 0, bronze: 1, total: 1 }
    },
    {
      rank: 78,
      organisation: { description: 'Estonia', code: 'EST' },
      medals: { gold: 0, silver: 0, bronze: 1, total: 1 }
    },
    {
      rank: 78,
      organisation: { description: 'Finland', code: 'FIN' },
      medals: { gold: 0, silver: 0, bronze: 1, total: 1 }
    },
    {
      rank: 78,
      organisation: { description: 'Morocco', code: 'MAR' },
      medals: { gold: 0, silver: 0, bronze: 1, total: 1 }
    },
    {
      rank: 78,
      organisation: { description: 'Nigeria', code: 'NGR' },
      medals: { gold: 0, silver: 0, bronze: 1, total: 1 }
    },
    {
      rank: 78,
      organisation: { description: 'Portugal', code: 'POR' },
      medals: { gold: 0, silver: 0, bronze: 1, total: 1 }
    },
    {
      rank: 78,
      organisation: { description: 'Trinidad and Tobago', code: 'TTO' },
      medals: { gold: 0, silver: 0, bronze: 1, total: 1 }
    },
    {
      rank: 78,
      organisation: { description: 'United Arab Emirates', code: 'UAE' },
      medals: { gold: 0, silver: 0, bronze: 1, total: 1 }
    }
  ]
};

storiesOf('Typescript Component/Olympics', module)
  .addDecorator((storyFn: () => React.ReactNode) => (
    <TrackingContextProvider
      context={{
        component: 'ArticleSkeleton',
        attrs: {
          article_name: 'articleHeadline',
          section_details: 'section'
        }
      }}
      analyticsStream={analyticsStream}
    >
      <ArticleHarness>{storyFn()}</ArticleHarness>
    </TrackingContextProvider>
  ))
  .add('Medal Table', () => {
    return <MedalTable data={data} />;
  });

import React, { FC, useState } from 'react';
import { Container, ShowMoreButton } from './styles';
import { colours } from '@times-components/styleguide';
type MedalCount = {
  gold: number;
  silver: number;
  bronze: number;
  total: number;
};

type Organisation = {
  code: string;
  description: string;
};

export type MedalRow = {
  rank: number;
  medals: MedalCount;
  organisation: Organisation;
};
export type MedalTableData = {
  total: number;
  item: MedalRow[];
};

const DEFAULT_ROWS = 7;
const MORE_ROWS = 10;

type Props = { data: MedalTableData };

const getRank = (item: MedalRow, index: number, array: MedalRow[]) => {
  const previousRow = array[index - 1];
  const nextRow = array[index + 1];
  return previousRow === undefined || previousRow.rank !== item.rank
    ? nextRow && nextRow.rank === item.rank
      ? item.rank + '='
      : item.rank
    : null;
};
export const MedalTable: FC<Props> = ({ data }) => {
  const [showCount, setShowCount] = useState(DEFAULT_ROWS);
  const moreCount =
    data.item.length - showCount < MORE_ROWS
      ? data.item.length - showCount
      : MORE_ROWS;
  return (
    <Container sectionColour={colours.section.world}>
      <div className="heading">Medal Table</div>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Country</th>
            <th>Gold</th>
            <th>Silver</th>
            <th>Bronze</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {data.item.map(
            (item, index, array) =>
              index < showCount && (
                <tr>
                  <td className="rank">{getRank(item, index, array)}</td>
                  <td className="country">{item.organisation.description}</td>
                  <td className="gold">{item.medals.gold}</td>
                  <td className="silver">{item.medals.silver}</td>
                  <td className="bronze">{item.medals.bronze}</td>
                  <td className="total">{item.medals.total}</td>
                </tr>
              )
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={6}>
              {moreCount > 0 ? (
                <ShowMoreButton
                  onClick={() => setShowCount(showCount + moreCount)}
                >
                  Show {moreCount} more
                </ShowMoreButton>
              ) : (
                <ShowMoreButton onClick={() => setShowCount(DEFAULT_ROWS)}>
                  Collapse
                </ShowMoreButton>
              )}
            </td>
          </tr>
        </tfoot>
      </table>
    </Container>
  );
};

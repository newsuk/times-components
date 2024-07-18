import React, { useState, useEffect, useCallback } from 'react';
import { DelayedComponent } from '../delayed-component/delayed-component';
import { UpdateButton } from './update-button';
import fetch from 'isomorphic-unfetch';

type UpdateWithDelayProps = {
  display: boolean;
  delay: number;
  label: string;
  handleClick: () => void;
  updatedTime: string;
  articleId: string;
  update: boolean;
};

export const fetchData = async (articleId: string) => {
  try {
    const response = await fetch(`/api/article-update-time/${articleId}`);
    const json = await response.json();
    return json.article.publishedTime;
  } catch (err) {
    // tslint:disable-next-line:no-console
    console.log(err);
  }
};

export const UpdateButtonWithDelay = ({
  delay,
  display,
  label,
  handleClick,
  updatedTime,
  articleId,
  update = false
}: UpdateWithDelayProps) => {
  const [hasUpdate, setUpdate] = useState(update);
  const cachedFetch = useCallback(
    async () => {
      return await fetchData(articleId);
    },
    [articleId]
  );
  useEffect(
    () => {
      const interval = setInterval(async () => {
        (await cachedFetch()) > updatedTime && setUpdate(true);
      }, 120000);

      return () => clearInterval(interval);
    },
    [cachedFetch, updatedTime]
  );

  return (
    <>
      {hasUpdate ? (
        <DelayedComponent delay={delay} initialState={display}>
          <UpdateButton label={label} handleClick={handleClick} />
        </DelayedComponent>
      ) : null}
    </>
  );
};

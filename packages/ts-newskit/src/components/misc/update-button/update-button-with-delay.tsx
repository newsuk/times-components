import React, { useState, useEffect } from 'react';
import { DelayedComponent } from '../delayed-component/delayed-component';
import { UpdateButton } from './update-button';
import fetch from 'isomorphic-unfetch';

type UpdateWithDelayProps = {
  loading: boolean;
  display: boolean;
  delay: number;
  label: string;
  handleClick: () => void;
  arrowUp: boolean;
  updatedTime: string;
  articleId: string;
};

export const UpdateButtonWithDelay = ({
  loading,
  delay,
  display,
  label,
  handleClick,
  arrowUp,
  updatedTime,
  articleId
}: UpdateWithDelayProps) => {
  const [hasUpdate, setUpdate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/article-update-time/${articleId}`);
        const json = await response.json();
        return json.article.updatedTime;
      } catch (err) {
        // tslint:disable-next-line:no-console
        console.log(err);
      }
    };
    const interval = setInterval(async () => {
      (await fetchData()) > updatedTime && setUpdate(true);
    }, 120000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      {hasUpdate ? (
        <DelayedComponent delay={delay} initialState={display}>
          <UpdateButton
            loading={loading}
            label={label}
            handleClick={handleClick}
            arrowUp={arrowUp}
          />
        </DelayedComponent>
      ) : null}
    </>
  );
};

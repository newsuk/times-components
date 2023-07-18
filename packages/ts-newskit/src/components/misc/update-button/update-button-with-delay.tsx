import React, { useState, useEffect } from 'react';
import { DelayedComponent } from '../delayed-component/delayed-component';
import { UpdateButton } from './update-button';
import fetch from 'isomorphic-unfetch';

type UpdateWithDelayProps = {
  display: boolean;
  delay: number;
  label: string;
  handleClick: () => void;
  arrowUp: boolean;
  updatedTime: string;
  articleId: string;
  update: boolean;
};

export const UpdateButtonWithDelay = ({
  delay,
  display,
  label,
  handleClick,
  arrowUp,
  updatedTime,
  articleId,
  update = false
}: UpdateWithDelayProps) => {
  const [hasUpdate, setUpdate] = useState(update);
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
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {hasUpdate ? (
        <DelayedComponent
          setUpdate={setUpdate}
          delay={delay}
          initialState={display}
        >
          <UpdateButton
            loading={false}
            label={label}
            handleClick={handleClick}
            arrowUp={arrowUp}
          />
        </DelayedComponent>
      ) : null}
    </>
  );
};

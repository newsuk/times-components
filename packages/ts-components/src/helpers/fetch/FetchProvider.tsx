import fetch from 'isomorphic-unfetch';
import React, { createContext, useState, useEffect, useContext } from 'react';

type FetchProviderProps = {
  url?: string;
  options?: { [key: string]: any };
  previewData?: any;
  children: React.ReactNode;
};

type FetchContext<T> = {
  loading: boolean;
  error?: string;
  data?: T;
};

const FetchProviderContext = createContext<FetchContext<unknown> | undefined>(
  undefined
);

export const FetchProvider: React.FC<FetchProviderProps> = ({
  url,
  options,
  previewData,
  children
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [data, setData] = useState<any | undefined>();

  useEffect(
    () => {
      if (!loading) {
        setLoading(true);

        const fetchData = async () => {
          try {
            if (url) {
              const response = await fetch(url, options);
              const json = await response.json();

              setData(json);
              setLoading(false);
            } else {
              throw new Error('must provide a Fetch url');
            }
          } catch (err) {
            setError(err instanceof Error ? err.message : 'unknown error');
            setLoading(false);
          }
        };

        if (previewData) {
          setData(previewData);
          setLoading(false);
        } else {
          fetchData();
        }
      }
    },
    [url, options, previewData]
  );

  return (
    <FetchProviderContext.Provider value={{ loading, error, data }}>
      {children}
    </FetchProviderContext.Provider>
  );
};

export const useFetch = <T extends any>(): FetchContext<T> => {
  const context: FetchContext<T> = useContext(
    FetchProviderContext
  ) as FetchContext<T>;

  if (context === undefined) {
    throw new Error('must be used within a FetchProvider');
  }

  return context;
};

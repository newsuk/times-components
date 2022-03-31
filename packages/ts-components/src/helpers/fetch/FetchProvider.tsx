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
  const [loading, setLoading] = useState<boolean>(!previewData);
  const [error, setError] = useState<string | undefined>();
  const [data, setData] = useState<any | undefined>(previewData);

  useEffect(() => {
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
        setError(err.message);
        setLoading(false);
      }
    };

    if (!previewData) {
      fetchData();
    }
  }, []);

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

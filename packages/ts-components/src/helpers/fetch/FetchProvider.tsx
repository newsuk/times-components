import fetch from 'isomorphic-unfetch';
import React, { createContext, useState, useEffect, useContext } from 'react';

type FetchProviderProps = {
  url: string;
  options?: { [key: string]: any };
  children: React.ReactNode;
};

type FetchContext = {
  loading: boolean;
  error?: string;
  data?: any;
};

const FetchProviderContext = createContext<FetchContext>({ loading: true });

export const FetchProvider: React.FC<FetchProviderProps> = ({
  url,
  options,
  children
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>();
  const [data, setData] = useState<any | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const json = await response.json();

        setData(json);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <FetchProviderContext.Provider value={{ loading, error, data }}>
      {children}
    </FetchProviderContext.Provider>
  );
};

export const useFetch = () => {
  const context = useContext(FetchProviderContext);

  if (context === undefined) {
    throw new Error('must be used within a FetchProvider');
  }

  return context;
};

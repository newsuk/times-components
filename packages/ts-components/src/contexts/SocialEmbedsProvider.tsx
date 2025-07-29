import React, { createContext, useContext, useState, useEffect } from 'react';

interface SocialEmbedsContextType {
  isSocialEmbedAllowed: Record<string, boolean>;
  setIsSocialEmbedAllowed: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  isAllowedOnce: Record<string, boolean>;
  setIsAllowedOnce: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
}

const SocialEmbedsContext = createContext<SocialEmbedsContextType | undefined>(
  undefined
);

export const SocialEmbedsProvider: React.FC = ({ children }) => {
  const [isSocialEmbedAllowed, setIsSocialEmbedAllowed] = useState<
    Record<string, boolean>
  >({
    instagram: false,
    twitter: false,
    tiktok: false,
    youtube: false
  });

  const [isAllowedOnce, setIsAllowedOnce] = useState<Record<string, boolean>>({
    instagram: false,
    twitter: false,
    tiktok: false,
    youtube: false
  });

  useEffect(
    () => {
      console.log('lol in use Effect', isSocialEmbedAllowed);
      // Set defaults or perform any logic needed to initialize the values
      setIsAllowedOnce({
        instagram: isSocialEmbedAllowed.instagram,
        twitter: isSocialEmbedAllowed.twitter,
        tiktok: isSocialEmbedAllowed.tiktok,
        youtube: isSocialEmbedAllowed.youtube
      });
      // eslint-disable-next-line no-console
      console.log('lol in use Effect 2', isSocialEmbedAllowed);
    },
    [isSocialEmbedAllowed]
  );

  // eslint-disable-next-line no-console
  console.log('lol isSocialEmbedAllowed', isSocialEmbedAllowed);
  // eslint-disable-next-line no-console
  console.log('lol isAllowedOnce', isAllowedOnce);

  return (
    <SocialEmbedsContext.Provider
      value={{
        isSocialEmbedAllowed,
        setIsSocialEmbedAllowed,
        isAllowedOnce,
        setIsAllowedOnce
      }}
    >
      {children}
    </SocialEmbedsContext.Provider>
  );
};

export const useSocialEmbedsContext = () => {
  const context = useContext(SocialEmbedsContext);
  if (!context) {
    throw new Error(
      'useSocialEmbedsContext must be used within a SocialEmbedsProvider'
    );
  }
  return context;
};

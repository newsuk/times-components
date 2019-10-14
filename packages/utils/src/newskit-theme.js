/* eslint-disable import/prefer-default-export */
import React from "react";
import { createTheme, theTimesTheme } from "newskit";
import {
  IconFacebook,
  IconTwitter,
  IconCopyLink,
  IconEmail
} from "@times-components/icons";

export const newskitTheme = createTheme("TimesStyleGuide", {
  baseTheme: theTimesTheme,
  themeOverrider: () => ({
    icons: {
      email: (
        <IconEmail
          fillColour="currentColor"
          height={18}
          title="Share by email"
        />
      ),
      facebook: (
        <IconFacebook
          fillColour="currentColor"
          height={18}
          title="Share on Facebook"
        />
      ),
      twitter: (
        <IconTwitter
          fillColour="currentColor"
          height={18}
          title="Share on Twitter"
        />
      ),
      copy: (
        <IconCopyLink
          fillColour="currentColor"
          height={18}
          title="Copy link to clipboard"
        />
      )
    }
  })
});

import React from "react";
import { IconStar } from "@times-components/icons";
import { colours } from "@times-components/styleguide";
import Shave from "./shave";

const { primary, cancel: secondary } = colours.functional;

export const makeShareIcon = (Icon, title, isSharing = false) => props => (
  <Shave
    {...props}
    Icon={Icon}
    title={title}
    isShaving={isSharing}
    primary={primary}
    secondary={secondary}
  />
);

export const makeSaveIcon = (isSaved, isSaving) => props => (
  <Shave
    {...props}
    title={isSaved ? "Remove articles" : "Save article"}
    Icon={IconStar}
    withFill
    isShaving={isSaving}
    isShaved={isSaved}
    primary={primary}
    secondary={secondary}
  />
);

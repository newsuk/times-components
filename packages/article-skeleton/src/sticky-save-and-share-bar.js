import React from "react";
import SaveAndShareBar from "@times-components/save-and-share-bar";
import { saveApi as saveArticleApi } from "@times-components/save-star-web";
import Sticky from "@times-components/sticky";
import {
  SaveShareContainer,
  SaveShareInnerContainer
} from "./styles/responsive";

function StickySaveAndShareBar({ saveApi, ...props }) {
  const api = saveApi && saveApi.bookmark ? saveApi : saveArticleApi;

  return (
    <Sticky Component={SaveShareContainer}>
      <SaveShareInnerContainer>
        <SaveAndShareBar {...props} saveApi={api} />
      </SaveShareInnerContainer>
    </Sticky>
  );
}

export default StickySaveAndShareBar;

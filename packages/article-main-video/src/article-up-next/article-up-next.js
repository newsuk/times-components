import React, { useEffect, useRef, useState } from "react";
import { ArticleLabelText, ArticleMainVideoContainer, ArticleTitle } from "../styles/responsive";
import { UpNextContainer, UpNextTiles, UpNextTile, UpNextScroll, UpNextTileOverlayLeft, UpNextTileOverlayRight, ImageContainer, VideoDurationLabel } from "../styles/article-up-next";
import { debounce } from "@times-components/utils";
import Image from "@times-components/image";

export const ArticleUpNext = ({ upNextArticles }) => {
  const scrollRef = useRef(null);
  const [showOverlay, setshowOverlay] = useState({
    left: false,
    right: true
  });

  const handleScroll = (isEnd) => {
    const scrollContainerPos = scrollRef.current.scrollLeft;
    setshowOverlay({
      left: scrollContainerPos > 5 ? true : false,
      right: !isEnd || scrollContainerPos === 0
    });
  }

  useEffect(() => {
    scrollRef.current.addEventListener("scroll", () => {
      debounce(handleScroll(), 1000);
    });
    scrollRef.current.addEventListener("scrollend", () => {
      debounce(handleScroll(true), 500);
    });
  },[]);

  return (
    <ArticleMainVideoContainer $color="#1D1D1B">
      <UpNextContainer>
        <ArticleLabelText>Up Next</ArticleLabelText>
        {upNextArticles.length > 2 && <UpNextTileOverlayLeft $displayStatus={showOverlay.left} />}
        <UpNextScroll ref={scrollRef}>
          <UpNextTiles>
            {upNextArticles.map(article => (
              <UpNextTile key={article.title}>
                <ImageContainer>
                  <VideoDurationLabel>Up Next</VideoDurationLabel>
                  <Image url={article.posterImage} />
                </ImageContainer>
                <ArticleTitle>{article.title}</ArticleTitle>
              </UpNextTile>
            ))}
          </UpNextTiles>
        </UpNextScroll>
        {upNextArticles.length > 2 && <UpNextTileOverlayRight $displayStatus={showOverlay.right} />}
      </UpNextContainer>
    </ArticleMainVideoContainer>
  );
}

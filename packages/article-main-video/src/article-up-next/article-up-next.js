import React, { useEffect, useRef, useState } from "react";
import { debounce } from "@times-components/utils";
import Image from "@times-components/image";
import PropTypes from "prop-types";
import Link from "@times-components/link";
import { ArticleLabelText, ArticleTitle } from "../styles/responsive";
import {
  UpNextContainer,
  UpNextTiles,
  UpNextTile,
  UpNextScroll,
  UpNextTileOverlayLeft,
  UpNextTileOverlayRight,
  ImageContainer,
  VideoDurationLabel,
  ArticleUpNextContainer
} from "../styles/article-up-next";

export const ArticleUpNext = ({ upNextArticles }) => {
  const scrollRef = useRef(null);
  const [showOverlay, setshowOverlay] = useState({
    left: false,
    right: true
  });

  const handleScroll = isEnd => {
    const scrollContainerPos = scrollRef.current.scrollLeft;
    setshowOverlay({
      left: scrollContainerPos > 5,
      right: !isEnd || scrollContainerPos === 0
    });
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", () => {
        debounce(handleScroll(), 1000);
      });
      scrollRef.current.addEventListener("scrollend", () => {
        debounce(handleScroll(true), 500);
      });
    }
  }, []);

  return (
    <ArticleUpNextContainer>
      <UpNextContainer>
        <ArticleLabelText>Up Next</ArticleLabelText>
        {upNextArticles.length > 2 && (
          <UpNextTileOverlayLeft $displayStatus={showOverlay.left} />
        )}
        <UpNextScroll ref={scrollRef}>
          <UpNextTiles>
            {upNextArticles.map(article => (
              <UpNextTile key={article.id}>
                <Link url={article.url}>
                  <ImageContainer>
                    <VideoDurationLabel>{article.duration}</VideoDurationLabel>
                    <Image aspectRatio={16 / 9} uri={article.posterImage} />
                  </ImageContainer>
                  <ArticleTitle>{article.title}</ArticleTitle>
                </Link>
              </UpNextTile>
            ))}
          </UpNextTiles>
        </UpNextScroll>
        {upNextArticles.length > 1 && (
          <UpNextTileOverlayRight $displayStatus={showOverlay.right} />
        )}
      </UpNextContainer>
    </ArticleUpNextContainer>
  );
};

ArticleUpNext.propTypes = {
  upNextArticles: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      posterImage: PropTypes.string,
      duration: PropTypes.string
    })
  ).isRequired
};

export default ArticleUpNext;

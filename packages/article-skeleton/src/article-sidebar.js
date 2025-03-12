import { useEffect } from "react";
import GET_PUZZLE_SECTIONS from "@times-components/provider-queries/src/sidebar-data.js";

const baseURL = "/puzzles/word-puzzles";

export const fetchPolygonData = async () => {
  try {
    const response = await fetch("https://api.thetimes.co.uk/graphql", {
      method: "POST",
      headers: { "x-use-standalone-puzzle-data": "true" },
      body: JSON.stringify({
        query: GET_PUZZLE_SECTIONS,
        variables: { type: "polygon" }
      })
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    const data = await response.json();
    const puzzles =
      data && data.data && data.data.puzzles && data.data.puzzles.list;

    const puzzleUrl = puzzles
      ? puzzles.map(
          ({ slug, shortIdentifier }) => `${baseURL}/${slug}-${shortIdentifier}`
        )
      : [];
    return puzzleUrl;
  } catch (error) {
    console.error("Error fetching puzzle data:", error);
    return [];
  }
};

export function useSidebarLogic({
  canShowSidebar,
  categoryPath,
  quizleSidebarRef,
  sidebarRef,
  setPolygonUrl,
  setQuizleSidebarHeight
}) {
  useEffect(
    () => {
      if (!canShowSidebar) return;

      const fetchPolygon = async () => {
        const polygon = await fetchPolygonData();
        setPolygonUrl(polygon);
      };

      fetchPolygon();
    },
    [canShowSidebar]
  );

  useEffect(
    () => {
      if (
        !canShowSidebar ||
        categoryPath === "life-style" ||
        !quizleSidebarRef.current
      ) {
        return undefined;
      }

      const observer = new ResizeObserver(([entry]) => {
        if (entry && entry.contentRect && entry.contentRect.height) {
          setQuizleSidebarHeight(-entry.contentRect.height);
        }
      });

      observer.observe(quizleSidebarRef.current);

      return () => observer.disconnect();
    },
    [canShowSidebar, categoryPath]
  );

  const handleScroll = () => {
    const sidebarNode = sidebarRef.current;
    if (!sidebarNode) return;

    const adElements = document.querySelectorAll(
      ".responsive__InlineAdWrapper-sc-4v1r4q-17, .responsive__InlineAdWrapper-sc-4v1r4q-14, .responsive__FullWidthImg-sc-4v1r4q-4, .responsive__InteractiveContainer-sc-4v1r4q-2"
    );

    let isAnyAdIntersecting = false;

    adElements.forEach(adElement => {
      if (adElement) {
        const adRect = adElement.getBoundingClientRect();
        const isAdIntersecting =
          adRect.top <= sidebarNode.getBoundingClientRect().bottom &&
          adRect.bottom >= sidebarNode.getBoundingClientRect().top;

        if (isAdIntersecting) {
          isAnyAdIntersecting = true;
        }
      }
    });

    sidebarNode.style.opacity = isAnyAdIntersecting ? "0" : "1";
  };

  useEffect(
    () => {
      if (!canShowSidebar) return undefined;

      const sidebarNode = sidebarRef.current;
      if (sidebarNode) {
        sidebarNode.style.transition = "opacity 0.2s ease";
      }

      handleScroll();
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    },
    [canShowSidebar]
  );
}

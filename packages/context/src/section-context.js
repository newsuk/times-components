import { createContext } from "react";

export default createContext({
  onArticleSavePress: null,
  publicationName: "TIMES",
  recentlyOpenedPuzzleCount: 0,
  savedArticles: null
});

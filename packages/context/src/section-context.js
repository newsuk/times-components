import { createContext } from "react";

export default createContext({
  onSaveStarPress: null,
  publicationName: "TIMES",
  recentlyOpenedPuzzleCount: 0,
  savedArticles: null
});

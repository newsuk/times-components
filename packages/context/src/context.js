import { createContext } from "react";
import defaults from "./defaults";
import SectionContext from "./section-context";

export default createContext(defaults);
export { defaults, SectionContext };

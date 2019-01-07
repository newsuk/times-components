import { createContext } from "react";
import defaults from "./defaults";
import ResponsiveContext from "./responsive-context";

export default createContext(defaults);
export { defaults, ResponsiveContext };

import React, { createContext } from "react";
import defaults from "./defaults";
import SectionContext from "./section-context";

const Context = createContext(defaults);

function ContextProviderWithDefaults({ value, ...props }) {
  return <Context.Provider {...props} value={{ ...defaults, ...value }} />;
}

export default Context;
export { defaults, SectionContext, ContextProviderWithDefaults };

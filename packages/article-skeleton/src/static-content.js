import { createElement } from "react";

export default function StaticContent({
  children,
  element = "div",
  html,
  ...props
}) {
  return createElement(element, {
    ...props,
    undefined,
    suppressHydrationWarning: true,
    dangerouslySetInnerHTML: { __html: html }
  });
}

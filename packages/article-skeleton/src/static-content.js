import { createElement } from "react";

export default function StaticContent({
  children,
  element = "div",
  html,
  ...props
}) {
  // set the HTML dangerously
  return createElement(element, {
    ...props,
    undefined,
    suppressHydrationWarning: true,
    dangerouslySetInnerHTML: { __html: html }
  });
}

import { useEffect, createElement, useRef, useState } from "react";

function useStaticContent() {
  const ref = useRef(null);
  const [render, setRender] = useState(typeof window === "undefined");

  useEffect(() => {
    const isEmpty = !!ref.current && ref.current.innerHTML === "";
    if (isEmpty) {
      setRender(true);
    }
  }, []);

  return [render, ref];
}

export default function StaticContent({
  children,
  element = "div",
  html,
  ...props
}) {
  const [shouldRender, ref] = useStaticContent();

  if (shouldRender) {
    return createElement(element, {
      ...props,
      children
    });
  }

  return createElement(element, {
    ...props,
    ref,
    suppressHydrationWarning: true,
    dangerouslySetInnerHTML: { __html: html }
  });
}

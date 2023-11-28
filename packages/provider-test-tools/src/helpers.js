export function tidyEvent(e) {
  if (e.type === "render" || e.type === "error") {
    return e;
  }

  return {
    query: e.operation.operationName,
    type: e.type,
    vars: e.operation.variables,
  };
}

export function getEvents(link) {
  return link.getEvents().map(tidyEvent);
}

export function getResolvedQueries(link) {
  return link
    .getEvents()
    .filter((e) => e.type === "resolved")
    .map(tidyEvent);
}

export function getRenderedQueries(link) {
  return link
    .getEvents()
    .filter((e) => e.type === "render")
    .map(tidyEvent)
    .map((x) => x.props);
}

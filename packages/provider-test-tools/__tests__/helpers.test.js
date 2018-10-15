import { getEvents, getResolvedQueries, getRenderedQueries } from "../src";

const operationEvent = {
  operation: {
    operationName: "Test",
    variables: {
      foo: 1
    }
  },
  type: "resolved"
};

const tidyOperationEvent = {
  query: "Test",
  type: "resolved",
  vars: {
    foo: 1
  }
};

const renderEvent = {
  props: {
    foo: 1
  },
  type: "render"
};

const mockTestLink = {
  getEvents: () => [operationEvent, renderEvent]
};

describe("Provider helper tests", () => {
  it("should return a renderEvent", () => {
    expect(getRenderedQueries(mockTestLink)).toEqual([renderEvent.props]);
  });

  it("should return a OperationEvent", () => {
    expect(getResolvedQueries(mockTestLink)).toEqual([tidyOperationEvent]);
  });

  it("should return all events", () => {
    expect(getEvents(mockTestLink)).toEqual([tidyOperationEvent, renderEvent]);
  });
});

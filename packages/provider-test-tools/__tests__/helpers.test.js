import { getEvents, getResolvedQueries, getRenderedQueries } from "../";

const operationEvent = {
  type: "resolved",
  operation: {
    operationName: "Test",
    variables: { foo: 1 }
  }
};

const tidyOperationEvent = {
  type: "resolved",
  query: "Test",
  vars: { foo: 1 }
};

const renderEvent = {
  type: "render",
  props: { foo: 1 }
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

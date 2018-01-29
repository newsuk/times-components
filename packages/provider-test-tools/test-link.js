import { ApolloLink, Observable } from "apollo-link";
import isEqual from "lodash.isequal";
import { createFuture } from "./future";

export class TestLink extends ApolloLink {
  constructor(onRequest) {
    super();
    this.onRequest = onRequest;
    this.operations = [];
    this.blocked = [];
    this.events = [];
  }

  findByQuery(queryName, variables) {
    return this.operations.find(
      ({ operation }) =>
        operation.operationName === queryName &&
        (!variables || isEqual(operation.variables, variables))
    );
  }

  filterByQuery(queryName, variables) {
    return this.operations.filter(
      ({ operation }) =>
        operation.operationName === queryName &&
        (!variables || isEqual(operation.variables, variables))
    );
  }

  // push a custom event
  pushEvent(data) {
    this.events.push(data);
  }

  // get all requests
  getRequests() {
    return this.operations;
  }

  // find and resolve a request by a given filter

  // get all events
  getEvents() {
    return this.events;
  }

  // used by apollo provider
  request(operation) {
    this.blocked.push(createFuture());
    const { promise, resolve } = this.blocked[this.blocked.length - 1];
    this.operations.push({ operation, resolve, promise });
    this.events.push({ type: "request", operation });
    return new Observable(observer => {
      Promise.resolve(this.onRequest(operation))
        .then(async data => {
          this.events.push({ type: "resolving", operation });
          await promise();
          this.events.push({ type: "resolved", operation, data });
          if (!observer.closed) {
            observer.next(data);
            observer.complete();
          }
        })
        .catch(e => {
          this.events.push({ type: "error", error: e });
          if (!observer.closed) {
            observer.error(e);
          }
        });
    });
  }
}

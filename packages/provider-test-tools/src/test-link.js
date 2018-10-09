import { ApolloLink, Observable } from "apollo-link";
import isEqual from "lodash.isequal";
import createFuture from "./future";

export default class TestLink extends ApolloLink {
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
    this.operations.push({
      operation,
      promise,
      resolve
    });
    this.events.push({
      operation,
      type: "request"
    });
    return new Observable(observer => {
      Promise.resolve(this.onRequest(operation))
        .then(async data => {
          this.events.push({
            operation,
            type: "resolving"
          });
          await promise();
          this.events.push({
            data,
            operation,
            type: "resolved"
          });
          if (!observer.closed) {
            observer.next(data);
            observer.complete();
          }
        })
        .catch(e => {
          this.events.push({
            error: e,
            type: "error"
          });
          if (!observer.closed) {
            observer.error(e);
          }
        });
    });
  }
}

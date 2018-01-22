import gql from "graphql-tag";
import { InMemoryCache } from "apollo-cache-inmemory";

import createPingPongClient from "./provider-testing-utils";

/* eslint-disable graphql/template-strings */

it("should not send the same query multiple times", async () => {
  const query = gql`
    query PingQuery($ID: Int) {
      ping(id: $ID) {
        id
      }
    }
  `;

  const client = createPingPongClient({
    cache: new InMemoryCache()
  });

  const q1 = client.query({ query, variables: { ID: 1 } });
  const q2 = client.query({ query, variables: { ID: 2 } });
  const q3 = client.query({ query, variables: { ID: 1 } });
  const q4 = client.query({ query, variables: { ID: 2 } });

  await client.resolve(1);
  await client.resolve(2);

  await Promise.all([q1, q2, q3, q4]);

  const events = client.getSnapshot();
  const resolved = events.filter(e => e.type === "resolved").map(e => e.id)
    .length;
  expect(resolved).toBe(2);
});

it("should resent same query with superfluous but used query variables", async () => {
  const query = gql`
    query PingQuery($ID: Int, $FOO: Int) {
      ping(id: $ID, foo: $FOO) {
        id
      }
    }
  `;

  const client = createPingPongClient({
    cache: new InMemoryCache()
  });

  const q1 = client.query({ query, variables: { ID: 1 } });

  await client.resolve(1);
  await q1;

  const resolved1 = client
    .getSnapshot()
    .filter(e => e.type === "resolved")
    .map(e => e.id).length;

  const q2 = client.query({ query, variables: { ID: 1, FOO: 2 } });
  await client.resolve(1);
  await q2;

  const resolved2 = client
    .getSnapshot()
    .filter(e => e.type === "resolved")
    .map(e => e.id).length;

  expect(resolved1).toBe(1);
  expect(resolved2).toBe(2);
});

it("should not resent same query if cached and superfluous but unused query variables", async () => {
  const query = gql`
    query PingQuery($ID: Int, $foo: Int) {
      ping(id: $ID) {
        id
      }
    }
  `;

  const client = createPingPongClient({
    cache: new InMemoryCache()
  });

  const q1 = client.query({ query, variables: { ID: 1 } });

  await client.resolve(1);
  await q1;

  const resolved1 = client
    .getSnapshot()
    .filter(e => e.type === "resolved")
    .map(e => e.id).length;

  const q2 = client.query({ query, variables: { ID: 1, foo: 2 } });
  await client.resolve(1);
  await q2;

  const resolved2 = client
    .getSnapshot()
    .filter(e => e.type === "resolved")
    .map(e => e.id).length;

  expect(resolved1).toBe(1);
  expect(resolved2).toBe(1);
});

it("should resent same query if cache is disabled", async () => {
  const query = gql`
    query PingQuery($ID: Int) {
      ping(id: $ID) {
        id
        data
      }
    }
  `;

  const client = createPingPongClient({
    cache: new InMemoryCache()
  });

  const q1 = client.query({
    query,
    variables: { ID: 1 }
  });

  await client.resolve(1, "foo");
  await q1;

  const resolved1 = client
    .getSnapshot()
    .filter(e => e.type === "resolved")
    .map(e => e.id).length;

  const q2 = client.query({
    query,
    variables: { ID: 1, foo: 2 },
    fetchPolicy: "network-only"
  });

  await client.resolve(1, "bar");
  const { ping } = await q2;

  const resolved2 = client
    .getSnapshot()
    .filter(e => e.type === "resolved")
    .map(e => e.id).length;

  expect(resolved1).toBe(1);
  expect(resolved2).toBe(2);
  expect(ping.data).toBe("bar");
});

it("should coalesce same queries even if cache is not used", async () => {
  const query = gql`
    query PingQuery($ID: Int) {
      ping(id: $ID) {
        id
      }
    }
  `;

  const client = createPingPongClient({
    cache: new InMemoryCache()
  });

  const q1 = client.query({
    query,
    variables: { ID: 1 },
    fetchPolicy: "network-only"
  });

  const q2 = client.query({
    query,
    variables: { ID: 1 },
    fetchPolicy: "network-only"
  });

  await client.resolve(1);
  await q1;
  await q2;

  const resolved = client
    .getSnapshot()
    .filter(e => e.type === "resolved")
    .map(e => e.id).length;

  expect(resolved).toBe(1);
});

it("should not resent same query even if it has a different name and variables", async () => {
  const query1 = gql`
    query Ping1Query($ID: Int) {
      ping(id: $ID) {
        id
      }
    }
  `;

  const query2 = gql`
    query Ping2Query($FOO: Int) {
      ping(id: $FOO) {
        id
      }
    }
  `;

  const client = createPingPongClient({
    cache: new InMemoryCache()
  });

  const q1 = client.query({ query: query1, variables: { ID: 1 } });

  await client.resolve(1);
  await q1;

  const q2 = client.query({ query: query2, variables: { FOO: 1 } });
  await q2;

  const resolved = client
    .getSnapshot()
    .filter(e => e.type === "resolved")
    .map(e => e.id).length;

  expect(resolved).toBe(1);
});

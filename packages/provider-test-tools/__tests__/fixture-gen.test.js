import { iterator } from "@times-components/test-utils";
import gql from "graphql-tag";
import { addTypenameToDocument } from "apollo-utilities";
import { graphql } from "graphql";
import { print } from "graphql/language/printer";
import mm from "../src/make-mocks";
import schema from "../fixtures/test-schema.json";

const defaultTypes = {
  UUID: () => "a7b69311-390c-4b23-b3b6-2a17f681d831"
};

const defaultValues = {
  article: () => ({
    headline: "Default headline"
  })
};

const makeMocks = mm(schema);

const tests = [
  {
    name: "custom type result",
    async test() {
      const query = addTypenameToDocument(gql`
        query {
          article(id: "1234") {
            headline
            id
            label
          }
        }
      `);

      const mockedSchema = makeMocks({
        types: {
          ...defaultTypes,
          String: () => "Test string"
        }
      });
      const result = await graphql(mockedSchema, print(query));

      expect(result).toMatchSnapshot();
    }
  },
  {
    name: "custom value result",
    async test() {
      const query = addTypenameToDocument(gql`
        query {
          article(id: "1234") {
            headline
            id
            label
          }
        }
      `);

      const mockedSchema = makeMocks({
        types: {
          ...defaultTypes
        },
        values: {
          ...defaultValues,
          article: () => ({
            headline: "A test headline",
            label: "A test label"
          })
        }
      });
      const result = await graphql(mockedSchema, print(query));

      expect(result).toMatchSnapshot();
    }
  },
  {
    name: "custom mutation value result",
    async test() {
      const query = addTypenameToDocument(gql`
        mutation {
          saveBookmarks(bookmarks: [{ id: "1234" }]) {
            id
          }
        }
      `);

      const mockedSchema = makeMocks({
        types: defaultTypes,
        values: defaultValues,
        mutationValues: {
          saveBookmarks: () => [{ id: "1234", __typename: "Bookmark" }]
        }
      });
      const result = await graphql(mockedSchema, print(query));

      expect(result).toMatchSnapshot();
    }
  }
];

iterator(tests);

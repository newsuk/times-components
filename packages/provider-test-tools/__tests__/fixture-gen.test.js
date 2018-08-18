import { iterator } from "@times-components/test-utils";
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

const makeMocks = mm(schema)({ types: defaultTypes, values: defaultValues });

const tests = [
  {
    name: "stubbed data with defaults",
    async test() {
      const query = `
      query {
        article {
          headline,
          id,
          label
        }
      }
      `;

      const result = await makeMocks(query);

      expect(result).toMatchSnapshot();
    }
  },
  {
    name: "custom type result",
    async test() {
      const query = `
      query {
        article {
          headline,
          id,
          label
        }
      }
      `;

      const result = await makeMocks(query, {
        types: {
          String: () => "Test string"
        }
      });

      expect(result).toMatchSnapshot();
    }
  },
  {
    name: "custom value result",
    async test() {
      const query = `
      query {
        article {
          headline,
          id,
          label
        }
      }
      `;

      const result = await makeMocks(query, {
        values: {
          article: () => ({
            headline: "A test headline",
            label: "A test label"
          })
        }
      });

      expect(result).toMatchSnapshot();
    }
  }
];

iterator(tests);

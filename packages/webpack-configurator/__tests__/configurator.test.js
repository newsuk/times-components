import create from "../src/configurator";

const p = (f, ...args) =>
  new Promise(resolve => f(...args, (_, path) => resolve(path)));

describe("webpack-configurator", () => {
  it("should identify relative paths as internal", async () => {
    const { externals } = create({});
    const relative = await p(externals, null, "./relative/path");
    expect(relative).toBeFalsy();
  });

  it("should declare packages as commonjs2", async () => {
    const { externals } = create({});
    const declaration = await p(externals, null, "module/entry");
    expect(declaration).toEqual("commonjs2 module/entry");
  });

  it("should append rnw to @times-components packages", async () => {
    const { externals } = create({});
    const declaration = await p(externals, null, "@times-components/package");
    expect(declaration).toEqual("commonjs2 @times-components/package/rnw");
  });

  it("should return babelconfig with rnw-plugin none found", async () => {
    const exists = jest.fn(() => false);
    const { getBabelConfig } = create({
      exists
    });

    const { plugins } = await getBabelConfig(".");
    expect(plugins).toEqual([
      "transform-es2015-modules-commonjs",
      "syntax-object-rest-spread",
      ["react-native-web", { commonjs: true }],
      "transform-react-remove-prop-types"
    ]);
  });

  it("should extend babelconfig with rnw-plugin", async () => {
    const exists = jest.fn(() => true);
    const readFile = jest.fn(
      () => `{
      "presets": ["stage-0"],
      "plugins": ["foo", "bar"]
    }`
    );

    const { getBabelConfig } = create({
      exists,
      readFile
    });

    const config = await getBabelConfig(".");
    expect(config).toMatchObject({
      plugins: [
        "transform-es2015-modules-commonjs",
        "syntax-object-rest-spread",
        [
          "react-native-web",
          {
            commonjs: true
          }
        ],
        "transform-react-remove-prop-types"
      ]
    });
  });

  it("should get the web entry if available", async () => {
    const exists = jest.fn(() => true);
    const readFile = jest.fn(
      () => `{
      "devEntry": "foo/index"
    }`
    );

    const resolver = file => `${file}.js`;

    const { getEntry } = create(
      {
        exists,
        readFile
      },
      resolver
    );

    const entry = await getEntry("/root", "devEntry");
    expect(entry).toEqual("/root/foo/index.web.js");
  });

  it("should throw if package.json not found", async () => {
    const exists = () => false;
    const { getEntry } = create({ exists });

    const entry = await getEntry("/root", "devEntry").catch(e => e);
    expect(entry).toMatchSnapshot();
  });

  it("should throw if entry could not be resolved", async () => {
    const exists = jest.fn(() => true);
    const readFile = jest.fn(
      () => `{
      "devEntry": "foo/index"
    }`
    );

    const resolver = () => {
      throw new Error("not found");
    };

    const { getEntry } = create({ exists, readFile }, resolver);

    const entry = await getEntry("/root", "devEntry").catch(e => e);
    expect(entry).toMatchSnapshot();
  });

  it("should get the generic entry if web entry not available", async () => {
    const exists = jest.fn(path => !path.match(/index\.web\.js$/));
    const readFile = jest.fn(
      () => `{
      "devEntry": "foo/index"
    }`
    );

    const resolver = file => `${file}.js`;

    const { getEntry } = create(
      {
        exists,
        readFile
      },
      resolver
    );

    const entry = await getEntry("/root", "devEntry");
    expect(entry).toEqual("/root/foo/index.js");
  });
});

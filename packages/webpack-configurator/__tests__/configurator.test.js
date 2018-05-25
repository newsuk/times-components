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


  it("should return babelconfig with rnw-plugin none found", () => {
    const existsSync = jest.fn(() => false);
    const { getBabelConfig } = create({
      existsSync
    });

    const { plugins } = getBabelConfig(".");
    expect(plugins).toEqual(["react-native-web"]);
    expect(existsSync.mock.calls[0][0]).toMatch(/\.babelrc$/);
  });

  it("should extend babelconfig with rnw-plugin", () => {
    const existsSync = jest.fn(() => true);
    const readFileSync = jest.fn(() => (`{
      "presets": ["stage-0"],
      "plugins": ["foo", "bar"]
    }`));

    const { getBabelConfig } = create({
      existsSync,
      readFileSync
    });

    const config = getBabelConfig(".");
    expect(config).toMatchObject({
      presets: ["stage-0"],
      plugins: ["foo", "bar", "react-native-web"]
    });

    expect(readFileSync.mock).toMatchObject(existsSync.mock);
  });

  it("should get the web entry if available", () => {
    const existsSync = jest.fn(() => true);
    const readFileSync = jest.fn(() => `{
      "devEntry": "foo/index"
    }`);

    const resolver = file => `${file}.js`;

    const { getEntry } = create({
      existsSync,
      readFileSync
    }, resolver);

    const entry = getEntry("/root", "devEntry");
    expect(entry).toEqual("/root/foo/index.web.js");
  });

  it("should throw if package.json not found", () => {
    const existsSync = jest.fn(() => false);
    const { getEntry } = create({existsSync});

    const get = () => getEntry("/root", "devEntry");
    expect(get).toThrowErrorMatchingSnapshot();
  });

  it("should throw if entry could not be resolved", () => {
    const existsSync = jest.fn(() => true);
    const readFileSync = jest.fn(() => `{
      "devEntry": "foo/index"
    }`);

    const resolver = () => {
      throw "not found";
    };

    const { getEntry } = create({existsSync, readFileSync}, resolver);

    const get = () => getEntry("/root", "devEntry");
    expect(get).toThrowErrorMatchingSnapshot();
  });

  it("should get the generic entry if web entry not available", () => {
    const existsSync = jest.fn(path => !path.match(/index\.web\.js$/));
    const readFileSync = jest.fn(() => `{
      "devEntry": "foo/index"
    }`);

    const resolver = file => `${file}.js`;

    const { getEntry } = create({
      existsSync,
      readFileSync
    }, resolver);

    const entry = getEntry("/root", "devEntry");
    expect(entry).toEqual("/root/foo/index.js");
  });

  it("should create a sensible webpackConfig", () => {
    const existsSync = jest.fn(path => path.match(/package\.json$/));
    const readFileSync = jest.fn(() => `{
      "devEntry": "foo/index"
    }`);

    const resolver = file => `${file}.js`;
    const configurator = create({
      existsSync,
      readFileSync
    }, resolver);

    expect(configurator("/root", "devEntry")).toMatchSnapshot();
  });
});

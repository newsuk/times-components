import resolveAttrs from "../src/resolve-attrs";

module.exports = () => {
  describe("resolveAttrs", () => {
    it("returns empty object if getAttrs is not supplied", () => {
      const attrs = resolveAttrs();

      expect(attrs).toEqual({});
    });

    it("returns empty object if getAttrs isn't a function", () => {
      const attrs = resolveAttrs("not a function");

      expect(attrs).toEqual({});
    });

    it("forwards props and eventArgs to getAttrs", () => {
      const getAttrs = (props, eventArgs) => ({
        someArg: eventArgs[0].three,
        someProp: props.one
      });
      const attrs = resolveAttrs(getAttrs, { one: "two" }, [{ three: "four" }]);

      expect(attrs).toEqual({
        someArg: "four",
        someProp: "two"
      });
    });
  });
};

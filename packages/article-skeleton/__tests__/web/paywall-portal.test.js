import React from "react";
import TestRenderer from "react-test-renderer";
import PaywallPortal from "../../src/paywall-portal";

describe("Paywall Portal", () => {
  describe("Should return an empty div with an id of the id that is passed as prop", () => {
    const props = {
      id: "id",
      componentName: "componentName"
    };

    it("when window is undefined", () => {
      window = undefined;
      const output = TestRenderer.create(<PaywallPortal {...props} />);
      expect(output).toMatchSnapshot();
    });

    it("when paywallComponent is undefined", () => {
      window = {};
      const output = TestRenderer.create(<PaywallPortal {...props} />);
      expect(output).toMatchSnapshot();
    });

    it("when id is not a property of paywallComponent", () => {
      window = {
        paywallComponent: {
          hello: "World"
        }
      };
      const output = TestRenderer.create(<PaywallPortal {...props} />);
      expect(output).toMatchSnapshot();
    });
  });

  describe("Should return a div with an id of the id that is passed as prop", () => {
    it("and contain the component that is passed as componentName", () => {
      const props = {
        id: "id",
        componentName: "componentName"
      };

      window.paywallComponent = {
        componentName: "<div>Hello World</div>"
      };

      const output = TestRenderer.create(<PaywallPortal {...props} />);
      expect(output).toMatchSnapshot();
    });
  });
});

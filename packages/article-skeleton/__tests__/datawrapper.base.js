import React from "react";
import TestRenderer from "react-test-renderer";

import Datawrapper from "../src/article-body/datawrapper";

export default () => {
  describe("Datawrapper", () => {
    it("should render the iframe with the correct URL", () => {
      const component = TestRenderer.create(
        <Datawrapper id="A8ftI" />
      );

      expect(component.root.findByType('iframe').props.src).toEqual('https://datawrapper.dwcdn.net/A8ftI');
    });

    it("should render the iframe with the correct URL when version is passed", () => {
      const component = TestRenderer.create(
        <Datawrapper id="A8ftI" version="3" />
      );
      
      expect(component.root.findByType('iframe').props.src).toEqual('https://datawrapper.dwcdn.net/A8ftI/3');
    });

    it("should update the height when a valid postmessage is recieved", async () => {
      const component = TestRenderer.create(
        <Datawrapper id="A8ftI" />
      );

      await TestRenderer.act(async () => {
        window.postMessage({
          'datawrapper-height': {
            A8ftI: 175
          }
        }, '*');

        // Wait for the next tick, for the postMessage to fire
        await new Promise(resolve => setTimeout(resolve, 100));
      });
      
      expect(component.root.findByType('iframe').props.height).toEqual(175);
    });

    it("should not update the height when a postmessage with a different chart ID is recieved", async () => {
      const component = TestRenderer.create(
        <Datawrapper id="A8ftI" />
      );

      await TestRenderer.act(async () => {
        window.postMessage({
          'datawrapper-height': {
            abcde: 175
          }
        }, '*');

        // Wait for the next tick, for the postMessage to fire
        await new Promise(resolve => setTimeout(resolve, 100));
      });
      
      expect(component.root.findByType('iframe').props.height).toEqual(0);
    });
  });
};

/**
 * @jest-environment jsdom
 */
/* eslint-env browser */

import React from "react";
import { hydrate, render } from "react-dom";
import { renderToString } from "react-dom/server";
import ServerClientRender from "../src/server-client-render";

describe("ServerClientRender", () => {
  it("renders the server path on the server", () => {
    const component = (
      <ServerClientRender client={null} server={() => <h1>Hello World</h1>} />
    );
    const string = renderToString(component);
    expect(string).toMatchSnapshot();
  });

  it("the client render function is never called on the server", () => {
    const client = jest.fn(() => null);
    const component = (
      <ServerClientRender client={client} server={() => <h1>Hello World</h1>} />
    );
    renderToString(component);
    expect(client).not.toHaveBeenCalled();
  });

  it("renders the client path on the front end", () => {
    const component = (
      <ServerClientRender client={() => <h1>Hello World</h1>} server={null} />
    );
    const root = document.createElement("div");
    root.id = "react-root";
    render(component, root);
    expect(root).toMatchSnapshot();
  });

  describe("regression", () => {
    it("dom references remain stable whilst two pass rendering", () => {
      const component = (
        <ServerClientRender
          client={() => <div id="test" />}
          server={() => <div id="test" />}
        />
      );
      const root = document.createElement("div");
      root.innerHTML = renderToString(component);
      document.body.appendChild(root);

      const rendered = root.querySelector("#test");

      hydrate(component, root);

      expect(root.querySelector("#test")).toBe(rendered);
    });
  });
});

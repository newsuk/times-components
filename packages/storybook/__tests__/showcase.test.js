/* eslint-disable react/prop-types */

import React from "react";
import showcaseConverter from "../src/showcase-to-storybook";

describe("The showcase converter should", () => {
  let builder;
  let knobs;
  let actions;
  let converter;

  beforeEach(() => {
    class Builder {
      constructor(name, module) {
        this.name = name;
        this.module = module;
        this.items = [];
      }

      add(name, componentFn) {
        this.items.push({
          name,
          component: componentFn()
        });

        return this;
      }

      addDecorator(item) {
        this.items.push(item);

        return this;
      }
    }

    knobs = {
      color: jest.fn(),
      select: jest.fn()
    };
    actions = {
      action: jest.fn()
    };

    converter = showcaseConverter(
      (name, module) => {
        builder = new Builder(name, module);

        return builder;
      },
      knobs,
      actions
    );
  });

  it("create the expected builder", () => {
    const module = {
      test: "test"
    };

    const showcase = {
      name: "My Showcase"
    };

    converter(module, showcase);

    expect(builder.name).toEqual(showcase.name);
    expect(builder.module).toEqual(module);
  });

  it("do nothing if not given a showcase", () => {
    converter(module);

    expect(builder.items).toEqual([]);
  });

  it("add a single story", () => {
    const showcase = {
      name: "My Showcase",
      children: [
        {
          type: "story",
          name: "My Story",
          component: () => <div>Hello World!</div>
        }
      ]
    };

    converter(module, showcase);

    expect(builder.items).toMatchSnapshot();
  });

  it("add two stories", () => {
    const showcase = {
      name: "My Showcase",
      children: [
        {
          type: "story",
          name: "My Story 1",
          component: () => <div>Hello World!</div>
        },
        {
          type: "story",
          name: "My Story 2",
          component: () => <div>Hello World Again!</div>
        }
      ]
    };

    converter(module, showcase);

    expect(builder.items).toMatchSnapshot();
  });

  it("add a story with a decorator", () => {
    const showcase = {
      name: "My Showcase",
      children: [
        {
          type: "decorator",
          decorator: <div>Some decorator</div>
        },
        {
          type: "story",
          name: "My Story",
          component: () => <div>Hello World!</div>
        }
      ]
    };

    converter(module, showcase);

    expect(builder.items).toMatchSnapshot();
  });

  it("add a decorator between stories", () => {
    const showcase = {
      name: "My Showcase",
      children: [
        {
          type: "story",
          name: "My Story",
          component: () => <div>Hello World!</div>
        },
        {
          type: "decorator",
          decorator: <div>Some decorator</div>
        },
        {
          type: "story",
          name: "My Story 2",
          component: () => <div>Hello World Again!</div>
        }
      ]
    };

    converter(module, showcase);

    expect(builder.items).toMatchSnapshot();
  });

  it("provide the color knob to a story", () => {
    const name = "Some Name";
    const initValue = "red";

    knobs.color.mockReturnValue("red");

    const showcase = {
      name: "My Showcase",
      children: [
        {
          type: "story",
          name: "My Story",
          component: ({ color }) => (
            <div color={color(name, initValue)}>Hello World!</div>
          )
        }
      ]
    };

    converter(module, showcase);

    expect(builder.items).toMatchSnapshot();
    expect(knobs.color).toHaveBeenCalledWith(name, initValue);
  });

  it("provide the select knob to a story", () => {
    const name = "Some Name";
    const options = {
      1: "red",
      2: "green"
    };
    const initValue = 1;

    knobs.select.mockReturnValue("red");

    const showcase = {
      name: "My Showcase",
      children: [
        {
          type: "story",
          name: "My Story",
          component: ({ select }) => (
            <div color={select(name, options, initValue)}>Hello World!</div>
          )
        }
      ]
    };

    converter(module, showcase);

    expect(builder.items).toMatchSnapshot();
    expect(knobs.select).toHaveBeenCalledWith(name, options, initValue);
  });

  it("provide the action to a story", () => {
    const event = {
      test: "test"
    };

    const showcase = {
      name: "My Showcase",
      children: [
        {
          type: "story",
          name: "My Story",
          component: (_, { action }) => (
            <div onPress={action(event)}>Hello World!</div>
          )
        }
      ]
    };

    converter(module, showcase);

    expect(builder.items).toMatchSnapshot();
    expect(actions.action).toHaveBeenCalledWith(event);
  });
});

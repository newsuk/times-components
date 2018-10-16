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
          component: componentFn(),
          name
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
      children: [
        {
          component: () => <div>Hello World!</div>,
          name: "My Story",
          type: "story"
        }
      ],
      name: "My Showcase"
    };

    converter(module, showcase);

    expect(builder.items).toMatchSnapshot();
  });

  it("add two stories", () => {
    const showcase = {
      children: [
        {
          component: () => <div>Hello World!</div>,
          name: "My Story 1",
          type: "story"
        },
        {
          component: () => <div>Hello World Again!</div>,
          name: "My Story 2",
          type: "story"
        }
      ],
      name: "My Showcase"
    };

    converter(module, showcase);

    expect(builder.items).toMatchSnapshot();
  });

  it("add a story with a decorator", () => {
    const showcase = {
      children: [
        {
          decorator: <div>Some decorator</div>,
          type: "decorator"
        },
        {
          component: () => <div>Hello World!</div>,
          name: "My Story",
          type: "story"
        }
      ],
      name: "My Showcase"
    };

    converter(module, showcase);

    expect(builder.items).toMatchSnapshot();
  });

  it("add a decorator between stories", () => {
    const showcase = {
      children: [
        {
          component: () => <div>Hello World!</div>,
          name: "My Story",
          type: "story"
        },
        {
          decorator: <div>Some decorator</div>,
          type: "decorator"
        },
        {
          component: () => <div>Hello World Again!</div>,
          name: "My Story 2",
          type: "story"
        }
      ],
      name: "My Showcase"
    };

    converter(module, showcase);

    expect(builder.items).toMatchSnapshot();
  });

  it("filter stories by platform", () => {
    const showcase = {
      children: [
        {
          component: () => <div>All!</div>,
          name: "All platforms",
          type: "story"
        },
        {
          component: () => <div>iOS!</div>,
          name: "iOS only",
          platform: "ios",
          type: "story"
        },
        {
          component: () => <div>Android!</div>,
          name: "Android only",
          platform: "android",
          type: "story"
        },
        {
          component: () => <div>Web!</div>,
          name: "Web only",
          platform: "web",
          type: "story"
        },
        {
          component: () => <div>Native!</div>,
          name: "Native only",
          platform: "native",
          type: "story"
        }
      ],
      name: "My Showcase"
    };

    converter(module, showcase);

    expect(builder.items).toMatchSnapshot();
  });

  it("provide the color knob to a story", () => {
    const name = "Some Name";
    const initValue = "red";

    knobs.color.mockReturnValue("red");

    const showcase = {
      children: [
        {
          component: ({ color }) => (
            <div color={color(name, initValue)}>Hello World!</div>
          ),
          name: "My Story",
          type: "story"
        }
      ],
      name: "My Showcase"
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
      children: [
        {
          component: ({ select }) => (
            <div color={select(name, options, initValue)}>Hello World!</div>
          ),
          name: "My Story",
          type: "story"
        }
      ],
      name: "My Showcase"
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
      children: [
        {
          component: (_, { action }) => (
            <div onPress={action(event)}>Hello World!</div>
          ),
          name: "My Story",
          type: "story"
        }
      ],
      name: "My Showcase"
    };

    converter(module, showcase);

    expect(builder.items).toMatchSnapshot();
    expect(actions.action).toHaveBeenCalledWith(event);
  });
});

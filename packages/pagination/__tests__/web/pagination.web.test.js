import React from "react";
import { mount, shallow } from "enzyme";
import { createHash } from "crypto";
import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  minimaliseTransform,
  minimalWebTransform,
  replacePropTransform,
  rnwTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import Pagination from "../../src/pagination";

describe("web", () => {
  const hash = v =>
    createHash("md5")
      .update(v)
      .digest("hex");

  addSerializers(
    expect,
    enzymeRenderedSerializer(),
    compose(
      stylePrinter,
      rnwTransform(),
      minimalWebTransform,
      minimaliseTransform(
        (value, key) =>
          key === "style" || key === "className" || key === "data-testid"
      ),
      replacePropTransform((value, key) => (key === "d" ? hash(value) : value))
    )
  );

  it("renders results, previous and next", () => {
    const props = {
      count: 20,
      page: 5,
      pageSize: 3
    };

    const wrapper = mount(<Pagination {...props} />);

    expect(wrapper).toMatchSnapshot("1. renders results, previous and next");
  });

  it("renders with no results", () => {
    const props = {
      count: 20,
      page: 5,
      pageSize: 3,
      hideResults: true
    };

    const wrapper = mount(<Pagination {...props} />);

    expect(wrapper).toMatchSnapshot("2. renders with no results");
  });

  it("does not give a count smaller than a single page", () => {
    const props = {
      count: 20,
      page: 1,
      pageSize: 25
    };

    const wrapper = mount(<Pagination {...props} />);

    expect(wrapper).toMatchSnapshot(
      "3. does not give a count smaller than a single page"
    );
  });

  it("limits the starting result to the total count", () => {
    const props = {
      count: 20,
      page: 4,
      pageSize: 10
    };

    const wrapper = mount(<Pagination {...props} />);

    expect(wrapper).toMatchSnapshot(
      "4. limits the starting result to the total count"
    );
  });

  it("renders previous and not next", () => {
    const props = {
      count: 20,
      page: 5,
      pageSize: 4,
      hideResults: true
    };

    const wrapper = mount(<Pagination {...props} />);

    expect(wrapper).toMatchSnapshot("5. renders previous and not next");
  });

  it("renders next and not previous", () => {
    const props = {
      count: 20,
      page: 1,
      pageSize: 4,
      hideResults: true
    };

    const wrapper = mount(<Pagination {...props} />);

    expect(wrapper).toMatchSnapshot("6. renders next and not previous");
  });

  it("tracks next page interaction", () => {
    const stream = jest.fn();
    const wrapper = shallow(<Pagination count={21} page={1} />, {
      context: { tracking: { analytics: stream } }
    });

    wrapper
      .dive()
      .find("Link")
      .simulate("press");

    expect(stream).toHaveBeenCalledWith({
      component: "Pagination",
      action: "Pressed",
      attrs: {
        direction: "next",
        destinationPage: 2
      }
    });
  });

  it("tracks previous page interaction", () => {
    const stream = jest.fn();
    const wrapper = shallow(<Pagination count={21} page={2} />, {
      context: { tracking: { analytics: stream } }
    });

    wrapper
      .dive()
      .find("Link")
      .simulate("press");

    expect(stream).toHaveBeenCalledWith({
      component: "Pagination",
      action: "Pressed",
      attrs: {
        direction: "previous",
        destinationPage: 1
      }
    });
  });
});

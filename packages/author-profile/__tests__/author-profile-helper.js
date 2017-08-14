/* eslint-env jest */

import "jsdom";
import "react-native";
import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import AuthorProfile from "../author-profile";
import AuthorProfileHeader from "../author-profile-header";
import AuthorProfileItemSeparator from "../author-profile-item-separator";
import example from "../example.json";

example.articles.list = example.articles.list.map(el => ({
  ...el,
  publishedTime: new Date(el.publishedTime)
}));

const props = {
  data: Object.assign({}, example, {
    count: example.articles.count,
    page: 1,
    pageSize: 10
  }),
  isLoading: false
};

export default AuthorProfileContent => {
  it("renders profile", () => {
    const wrapper = shallow(<AuthorProfile {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it("renders profile content", () => {
    const component = renderer.create(<AuthorProfile {...props} />);

    expect(component).toMatchSnapshot();
  });

  it("renders profile loading", () => {
    const p = Object.assign({}, props, {
      data: null,
      isLoading: true
    });
    const component = renderer.create(<AuthorProfile {...p} />);

    expect(component).toMatchSnapshot();
  });

  it("renders profile empty", () => {
    const p = Object.assign({}, props, {
      data: null,
      isLoading: false
    });

    const component = renderer.create(<AuthorProfile {...p} />);

    expect(component).toMatchSnapshot();
  });

  it("renders profile header", () => {
    const component = renderer.create(<AuthorProfileHeader {...props.data} />);

    expect(component).toMatchSnapshot();
  });

  it("renders profile separator", () => {
    const component = renderer.create(<AuthorProfileItemSeparator />);

    expect(component).toMatchSnapshot();
  });

  it("renders profile content component", () => {
    const component = renderer.create(<AuthorProfileContent {...props.data} />);

    expect(component).toMatchSnapshot();
  });
};

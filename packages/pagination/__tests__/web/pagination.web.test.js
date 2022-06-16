import React from "react";
import { mount, shallow } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  minimaliseTransform,
  minimalWebTransform,
  stylePrinter,
  replacePropTransform
} from "@times-components/jest-serializer";
import { hash, iterator } from "@times-components/test-utils";
import Pagination from "../../src/pagination";

addSerializers(
  expect,
  enzymeRenderedSerializer(),
  compose(
    stylePrinter,
    minimalWebTransform,
    minimaliseTransform(
      (value, key) =>
        key === "style" || key === "className" || key === "data-testid"
    ),
    replacePropTransform((value, key) => (key === "d" ? hash(value) : value))
  )
);

const mockGenerateLink = page => `?mock-${page}`;

const tests = [
  {
    name: "renders results, previous and next",
    test: () => {
      const props = {
        count: 20,
        generatePageLink: mockGenerateLink,
        page: 5,
        pageSize: 3
      };

      const wrapper = mount(<Pagination {...props} />);

      expect(wrapper).toMatchSnapshot();
    }
  },
  {
    name: "renders with no results",
    test: () => {
      const props = {
        count: 20,
        generatePageLink: mockGenerateLink,
        hideResults: true,
        page: 5,
        pageSize: 3
      };

      const wrapper = mount(<Pagination {...props} />);

      expect(wrapper).toMatchSnapshot();
    }
  },
  {
    name: "does not give a count smaller than a single page",
    test: () => {
      const props = {
        count: 20,
        generatePageLink: mockGenerateLink,
        page: 1,
        pageSize: 25
      };

      const wrapper = mount(<Pagination {...props} />);

      expect(wrapper).toMatchSnapshot();
    }
  },
  {
    name: "limits the starting result to the total count",
    test: () => {
      const props = {
        count: 20,
        generatePageLink: mockGenerateLink,
        page: 4,
        pageSize: 10
      };

      const wrapper = mount(<Pagination {...props} />);

      expect(wrapper).toMatchSnapshot();
    }
  },
  {
    name: "renders previous and not next",
    test: () => {
      const props = {
        count: 20,
        generatePageLink: mockGenerateLink,
        hideResults: true,
        page: 5,
        pageSize: 4
      };

      const wrapper = mount(<Pagination {...props} />);

      expect(wrapper).toMatchSnapshot();
    }
  },
  {
    name: "renders next and not previous",
    test: () => {
      const props = {
        count: 20,
        generatePageLink: mockGenerateLink,
        hideResults: true,
        page: 1,
        pageSize: 4
      };

      const wrapper = mount(<Pagination {...props} />);

      expect(wrapper).toMatchSnapshot();
    }
  },
  {
    name: "tracks next page interaction",
    test: () => {
      const stream = jest.fn();
      const wrapper = shallow(
        <Pagination count={21} generatePageLink={mockGenerateLink} page={1} />,
        {
          context: { tracking: { analytics: stream } }
        }
      );

      wrapper
        .dive()
        .find("Link")
        .simulate("press");

      expect(stream).toHaveBeenCalledWith({
        action: "Pressed",
        attrs: {
          destinationPage: 2,
          direction: "next"
        },
        component: "Pagination"
      });
    }
  },
  {
    name: "tracks previous page interaction",
    test: () => {
      const stream = jest.fn();
      const wrapper = shallow(
        <Pagination count={21} generatePageLink={mockGenerateLink} page={2} />,
        {
          context: { tracking: { analytics: stream } }
        }
      );

      wrapper
        .dive()
        .find("Link")
        .simulate("press");

      expect(stream).toHaveBeenCalledWith({
        action: "Pressed",
        attrs: {
          destinationPage: 1,
          direction: "previous"
        },
        component: "Pagination"
      });
    }
  }
];

iterator(tests);

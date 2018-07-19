import React from "react";
import { Text } from "react-native";
import { shallow } from "enzyme";
import { iterator } from "@times-components/test-utils";

export default (withPageState, renderComponent) => {
  const tests = [
    {
      name: "inner component with page",
      test: () => {
        const Component = props => (
          <Text>{JSON.stringify(props, null, 2)}</Text>
        );
        const PageChanger = withPageState(Component);

        const props = {
          page: 1
        };

        const output = renderComponent(<PageChanger {...props} />);

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "inner component with new props",
      test: () => {
        const Component = props => (
          <Text>{JSON.stringify(props, null, 2)}</Text>
        );
        const PageChanger = withPageState(Component);

        const props = {
          foo: "not bar",
          page: 1
        };

        const wrapper = shallow(<PageChanger {...props} />);

        wrapper.setProps({ foo: "bar" });
        wrapper.update();

        expect(wrapper.state().foo).toEqual("bar");
        expect(wrapper.state().page).toEqual(1);
      }
    },
    {
      name: "inner component with prev page",
      test: () => {
        const Component = props => (
          <Text>{JSON.stringify(props, null, 2)}</Text>
        );
        const PageChanger = withPageState(Component);

        const props = {
          page: 2
        };

        const wrapper = shallow(<PageChanger {...props} />);
        wrapper.instance().handleChangePage({ preventDefault: () => {} }, 1);
        wrapper.update();

        expect(wrapper.state().page).toEqual(1);
      }
    },
    {
      name: "inner component with next page",
      test: () => {
        const Component = props => (
          <Text>{JSON.stringify(props, null, 2)}</Text>
        );
        const PageChanger = withPageState(Component);

        const props = {
          page: 2
        };

        const wrapper = shallow(<PageChanger {...props} />);
        wrapper.instance().handleChangePage({ preventDefault: () => {} }, 3);
        wrapper.update();

        expect(wrapper.state().page).toEqual(3);
      }
    }
  ];

  iterator(tests);
};

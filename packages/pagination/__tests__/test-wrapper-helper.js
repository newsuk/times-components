import React from "react";
import renderer from "react-test-renderer";
import { Text } from "react-native";
import PropTypes from "prop-types";
import Enzyme, { shallow } from "enzyme";
import React16Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new React16Adapter() });

export default withPageState => () => {
  it("renders inner component with page 1", () => {
    const Component = props => <Text>{JSON.stringify(props, null, 2)}</Text>;
    const PageChanger = withPageState(Component);

    const component = renderer.create(<PageChanger page={1} />).toJSON();
    expect(component).toMatchSnapshot();
  });

  it("renders inner component with new props", () => {
    const Component = props => <Text>{JSON.stringify(props, null, 2)}</Text>;
    const PageChanger = withPageState(Component);

    const wrapper = shallow(<PageChanger page={1} foo="not bar" />);

    wrapper.setProps({ foo: "bar" });
    wrapper.update();

    expect(wrapper.state().foo).toEqual("bar");
    expect(wrapper.state().page).toEqual(1);
  });

  const testRenderingInnerComponentWithPage = (currentPage, navigateToPage) => {
    const Component = props => <Text>page:{props.page}</Text>;
    Component.propTypes = {
      page: PropTypes.string.isRequired
    };
    const PageChanger = withPageState(Component);

    const wrapper = shallow(<PageChanger page={currentPage} />);
    wrapper.instance().onChangePage(navigateToPage);
    wrapper.update();

    expect(wrapper.state().page).toEqual(navigateToPage);
    expect(
      wrapper
        .dive()
        .dive()
        .text()
    ).toEqual(`page:${navigateToPage}`);
  };

  it("renders inner component with prev page", () => {
    testRenderingInnerComponentWithPage(2, 1);
  });

  it("renders inner component with next page", () => {
    testRenderingInnerComponentWithPage(2, 3);
  });
};

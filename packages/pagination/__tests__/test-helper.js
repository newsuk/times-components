import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import Enzyme, { shallow } from "enzyme";
import React16Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new React16Adapter() });

export default Pagination => () => {
  const checkMatchesSnapshot = props => {
    const component = renderer.create(<Pagination {...props} />).toJSON();
    expect(component).toMatchSnapshot();
  };

  it("renders correctly", () => {
    checkMatchesSnapshot({
      count: 21,
      page: 1
    });
  });

  it("renders results message", () => {
    checkMatchesSnapshot({
      count: 21,
      page: 1
    });
  });

  it("renders with hidden results", () => {
    checkMatchesSnapshot({
      count: 21,
      page: 1,
      hideResults: true
    });
  });

  it("renders with hidden topKeyline", () => {
    checkMatchesSnapshot({
      count: 21,
      page: 1,
      hideTopKeyline: true
    });
  });

  it("renders with hidden bottomKeyline", () => {
    checkMatchesSnapshot({
      count: 21,
      page: 1,
      hideBottomKeyline: true
    });
  });

  it("renders prev link", () => {
    checkMatchesSnapshot({
      count: 41,
      page: 3
    });
  });

  it("renders prev and next link", () => {
    checkMatchesSnapshot({
      count: 41,
      page: 2
    });
  });

  it("renders next link", () => {
    checkMatchesSnapshot({
      count: 41,
      page: 1
    });
  });

  const testPageInteraction = (startPage, attrs) => {
    jest.useFakeTimers();

    const stream = jest.fn();
    const component = shallow(<Pagination count={21} page={startPage} />, {
      context: { tracking: { analytics: stream } }
    });

    component
      .dive()
      .find("Link")
      .simulate("press");

    jest.runAllTimers();

    expect(stream).toHaveBeenCalledWith({
      component: "Pagination",
      action: "Pressed",
      attrs
    });
  };

  it("tracks next page interaction", () => {
    testPageInteraction(1, {
      direction: "next",
      destinationPage: 2
    });
  });

  it("tracks previous page interaction", () => {
    testPageInteraction(2, {
      direction: "previous",
      destinationPage: 1
    });
  });

  // it("debounces calls to onChangePage", () => {

  //   // jest.useFakeTimers();
  //   const onChangePage = jest.fn();
  //   const component = shallow(<Pagination count={500} page={2} onChangePage={onChangePage} />);

  //   const clickNextLink = () => component.dive().find("Link").at(1).simulate("press");
  //   const getResultsText = () => component.update().dive().find("Results").props().children;

  //   expect(getResultsText()).toEqual("Showing 21 - 40 of 500 results");
  //   clickNextLink();
  //   expect(component.update().dive().state()).toEqual({displayPage: 3});
  //   expect(getResultsText()).toEqual("Showing 21 - 40 of 500 results");

  //   // jest.runAllTimers();
  // });
};

import React from "react";
import { shallow } from "enzyme";
import Shavingbar from "../../src";
import Bubble from "../../src/bubble";
import Shave from "../../src/shave";

const click = button => {
  button.simulate("mouseEnter");
  button.simulate("pressIn");
  button.simulate("pressOut");
  button.simulate("press");
  button.simulate("mouseLeave");
};

describe("Shavingbar test on web: ", () => {
  it("should invert colors when active", () => {
    const render = jest.fn(() => null);

    shallow(<Shave Icon={render} title="test" />).dive();
    shallow(<Shave Icon={render} title="test" isActive />).dive();

    const [[inActive], [active]] = render.mock.calls;

    expect(inActive.fillColour).toEqual(active.strokeColour);
    expect(inActive.strokeColour).toEqual(active.fillColour);
  });

  it("should render ActivityIcon when sharing or saving", () => {
    expect(
      shallow(<Shave Icon={() => null} title="test" isShaving />).find(
        "ActivityIndicator"
      )
    ).toHaveLength(1);
  });

  it("should render bubble", () => {
    const render = jest.fn(() => null);
    const tree = shallow(<Bubble render={render} />);
    expect(
      tree
        .dive()
        .find("View")
        .at(0)
        .props()
    ).toMatchObject({
      "aria-pressed": false,
      "aria-disabled": false
    });

    expect(render.mock.calls).toMatchObject([
      [
        {
          isActive: false,
          hover: false
        }
      ]
    ]);
  });

  it("should invoke callback when bubble is clicked", () => {
    const render = jest.fn(() => null);
    const tree = shallow(<Bubble render={render} />);
    const Pressable = tree.find("Pressable").dive();

    click(Pressable);

    expect(render.mock.calls).toHaveLength(5);
    expect(render.mock.calls[1]).toMatchSnapshot();
  });

  it("should render 4 pressable bubbles", () => {
    const onClick = jest.fn();

    const tree = shallow(
      <Shavingbar
        onEmail={onClick}
        onTwitter={onClick}
        onFacebook={onClick}
        onSave={onClick}
      />
    ).dive();

    tree
      .find("Bubble")
      .map(bubble => bubble.dive().find("Pressable"))
      .forEach(click);

    expect(onClick.mock.calls).toHaveLength(4);
  });

  it("should read 'saved' when is saved", () => {
    const saved = shallow(<Shavingbar isSaved />)
      .dive()
      .find("Bar")
      .dive()
      .find("Responsive(Group)")
      .map(group => group.props())
      .filter(group => group.captionRole === "Save Status");

    const notSaved = shallow(<Shavingbar />)
      .dive()
      .find("Bar")
      .dive()
      .find("Responsive(Group)")
      .map(group => group.props())
      .filter(group => group.captionRole === "Save Status");

    expect(saved[0].caption).toEqual("Saved");
    expect(notSaved[0].caption).toEqual("Save");
  });

  it("should render 2 Bubbles in loading state", () => {
    const tree = shallow(<Shavingbar isSharing isSaving />);
    expect(
      tree
        .dive()
        .find("Bubble")
        .map(bubble => bubble.props().isLoading)
        .filter(x => x)
    ).toHaveLength(2);
  });
});

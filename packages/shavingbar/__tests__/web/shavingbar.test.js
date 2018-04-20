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

    shallow(<Shave Icon={render} title="test" isActive={false} />).dive();
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

  it("should render bubble2", () => {
    const render = jest.fn(() => null);
    const tree = shallow(<Bubble render={render} />);
    const Pressable = tree.find("Pressable").dive();
    click(Pressable);
    expect(Pressable.render()).toMatchSnapshot();

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
    );

    tree.find("Bubble").forEach(bubble =>
      click(
        bubble
          .dive()
          .find("Pressable")
          .dive()
      )
    );

    expect(onClick.mock.calls).toHaveLength(4);
  });

  it("should read 'saved' when is saved", () => {
    const saved = shallow(<Shavingbar isSaved />)
      .find("[aria-label='Save Status']")
      .render()
      .text();

    const notSaved = shallow(<Shavingbar isSaved={false} />)
      .find("[aria-label='Save Status']")
      .render()
      .text();

    expect(saved).toEqual("Saved");
    expect(notSaved).toEqual("Save");
  });

  it("should render 2 Bubbles in loading state", () => {
    const tree = shallow(<Shavingbar isSharing isSaving />);
    expect(
      tree
        .find("Bubble")
        .map(bubble => bubble.props().isLoading)
        .filter(x => x)
    ).toHaveLength(2);
  });
});

import React from "react";
import renderer from 'react-test-renderer';
import { mount, shallow, render } from "enzyme";
import {
  addSerializers,
  compose,
  minimaliseTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import AdWrapper from "../../src/ad-wrapper.web";

describe("ad-wrapper", () => {
  addSerializers(
    expect,
    compose(
      print,
      minimaliseTransform((value, key) => key === "style"),
      minimalNativeTransform
    )
  );
	let events;
	beforeEach(() => {
		// Empty our events before each test case
		events = {};

		// Define the addEventListener method
		window.addEventListener = jest.fn((event, callback) => {
				events[event] = callback;
		});
	});

  it("ad-article-inline-2 ad snapshot renders", () => {
		const component = renderer.create(<AdWrapper slotName="ad-article-inline-2" />);
		events.nukAdLibSlotsRendered({ detail: { name: "ad-article-inline-2" }});
    expect(component).toMatchSnapshot();
  });

	it("test state before event", () => {
		const wrapper = mount(<AdWrapper slotName="ad-article-inline-2" adRendered="false" />);
		
		expect(wrapper.state().adRendered).toEqual(false);
	});

	it("test state", () => {
		const wrapper = mount(<AdWrapper slotName="ad-article-inline-2" adRendered="false" />);

		events.nukAdLibSlotsRendered({ detail: { name: "ad-article-inline-2" }});

		expect(wrapper.state().adRendered).toEqual(true);
	});

});

import React from "react";
import { shallow } from "enzyme";
import Gesture from "../gestures";
import Image from "../image";

const mapTouches = ({ x, y }) => ({
  pageX: x,
  pageY: y
});

const makeTouchEvent = touches => ({
  touchHistory: {
    numberActiveTouches: touches.length,
    touchBank: touches
  },
  nativeEvent: {
    touches: touches.map(mapTouches)
  }
});

export default () => {
  describe("Gestures should", () => {
    let component;

    beforeEach(() => {
       component = shallow( <Gesture>
        <Image uri="http://example.com/image.jpg" aspectRatio={3 / 2} />
      </Gesture>);
    });

    it("handle a pinch", () => {
      const {
        panResponder: {
          panHandlers: {
            onResponderStart,
            onResponderMove
          }
        }
      } = component.instance();

      onResponderStart(makeTouchEvent([
        {
          x: 50,
          y: 50
        },
        {
          x: 100,
          y: 100
        }
      ]));

      onResponderMove(makeTouchEvent([
        {
          x: 0,
          y: 0
        },
        {
          x: 160,
          y: 140
        }
      ]));

      expect(component.find('AnimatedComponent')).toMatchSnapshot();
    });
  });
};

import React from "react";
import { shallow } from "enzyme";
import Gesture from "../gestures";
import Image from "../image";

const waitFor = delay => new Promise(res => setTimeout(res, delay));

const mapTouches = ({ x, y }) => ({
  pageX: x,
  pageY: y
});

const makeTouchEvent = (active, history = []) => ({
  touchHistory: {
    numberActiveTouches: history.length,
    touchBank: history.map(mapTouches)
  },
  nativeEvent: {
    touches: active.map(mapTouches)
  }
});

const touchAndMove = (startTouchPositions, endTouchPositions) => {
  const component = shallow(
    <Gesture>
      <Image uri="http://example.com/image.jpg" aspectRatio={3 / 2} />
    </Gesture>
  );

  const {
    panResponder: { panHandlers: { onResponderStart, onResponderMove } }
  } = component.instance();

  onResponderStart(makeTouchEvent(startTouchPositions));
  onResponderMove(makeTouchEvent(endTouchPositions, startTouchPositions));

  return component;
};

export default () => {
  describe("Gestures should", () => {
    it("scale correctly when spreading fingers", () => {
      const component = touchAndMove(
        [
          {
            x: 50,
            y: 50
          },
          {
            x: 100,
            y: 100
          }
        ],
        [
          {
            x: 0,
            y: 0
          },
          {
            x: 150,
            y: 150
          }
        ]
      );

      expect(component.find("AnimatedComponent")).toMatchSnapshot();
    });

    it("rotate anti-clockwise when turning fingers", () => {
      const component = touchAndMove(
        [
          {
            x: 50,
            y: 50
          },
          {
            x: 50,
            y: 100
          }
        ],
        [
          {
            x: 75,
            y: 75
          },
          {
            x: 25,
            y: 75
          }
        ]
      );

      expect(component.find("AnimatedComponent")).toMatchSnapshot();
    });

    it("rotate clockwise when turning fingers", () => {
      const component = touchAndMove(
        [
          {
            x: 50,
            y: 50
          },
          {
            x: 50,
            y: 100
          }
        ],
        [
          {
            x: 25,
            y: 75
          },
          {
            x: 75,
            y: 75
          }
        ]
      );

      expect(component.find("AnimatedComponent")).toMatchSnapshot();
    });

    it("scale and rotate when spreading and rotating fingers", () => {
      const component = touchAndMove(
        [
          {
            x: 50,
            y: 50
          },
          {
            x: 100,
            y: 100
          }
        ],
        [
          {
            x: 30,
            y: 40
          },
          {
            x: 190,
            y: 170
          }
        ]
      );

      expect(component.find("AnimatedComponent")).toMatchSnapshot();
    });

    it("do nothing if a finger is removed while interacting", () => {
      const start = [
        {
          x: 50,
          y: 50
        },
        {
          x: 100,
          y: 100
        }
      ];

      const end = [
        {
          x: 190,
          y: 170
        }
      ];

      const component = touchAndMove(start, end);

      expect(component.find("AnimatedComponent")).toMatchSnapshot();
    });

    it("animate back to the start after release", async () => {
      const component = touchAndMove(
        [
          {
            x: 50,
            y: 50
          },
          {
            x: 100,
            y: 100
          }
        ],
        [
          {
            x: 30,
            y: 40
          },
          {
            x: 190,
            y: 170
          }
        ]
      );

      const {
        panResponder: { panHandlers: { onResponderRelease } }
      } = component.instance();

      onResponderRelease();

      await waitFor(1000);

      expect(component.find("AnimatedComponent")).toMatchSnapshot();
    });
  });
};

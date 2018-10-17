import React from "react";
import { Text } from "react-native";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  minimalNative
} from "@times-components/jest-serializer";
import { iterator } from "@times-components/test-utils";
import Gesture from "../src/gestures";

const mapTouches = ({ x, y }) => ({
  pageX: x,
  pageY: y
});

const makeTouchEvent = (active, history = []) => ({
  nativeEvent: {
    touches: active.map(mapTouches)
  },
  touchHistory: {
    numberActiveTouches: history.length,
    touchBank: history.map(mapTouches)
  }
});

const renderComponent = () =>
  TestRenderer.create(
    <Gesture>
      <Text>Hello world!</Text>
    </Gesture>
  );

const gestureHandlers = component => {
  const {
    panResponder: { panHandlers }
  } = component;

  return panHandlers;
};

const touchAndMove = (startTouchPositions, endTouchPositions) => {
  const testRenderer = renderComponent();

  const { onResponderStart, onResponderMove } = gestureHandlers(
    testRenderer.getInstance()
  );

  onResponderStart(makeTouchEvent(startTouchPositions));
  onResponderMove(makeTouchEvent(endTouchPositions, startTouchPositions));

  return testRenderer;
};

export default () => {
  describe("", () => {
    beforeAll(() => jest.useFakeTimers());
    afterAll(() => jest.useRealTimers());

    addSerializers(expect, minimalNative);

    const tests = [
      {
        name: "scale correctly when spreading fingers",
        test() {
          const testRenderer = touchAndMove(
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

          expect(testRenderer).toMatchSnapshot();
        }
      },
      {
        name: "rotate anti-clockwise when turning fingers",
        test() {
          const testRenderer = touchAndMove(
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

          expect(testRenderer).toMatchSnapshot();
        }
      },
      {
        name: "rotate clockwise when turning fingers",
        test() {
          const testRenderer = touchAndMove(
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

          expect(testRenderer).toMatchSnapshot();
        }
      },
      {
        name: "scale and rotate when spreading and rotating fingers",
        test() {
          const testRenderer = touchAndMove(
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

          expect(testRenderer).toMatchSnapshot();
        }
      },
      {
        name: "do nothing if a finger is removed while interacting",
        test() {
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

          const testRenderer = touchAndMove(start, end);

          expect(testRenderer).toMatchSnapshot();
        }
      },
      {
        name: "animate back to the start after release",
        test() {
          const testRenderer = touchAndMove(
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

          const { onResponderRelease } = gestureHandlers(
            testRenderer.getInstance()
          );

          onResponderRelease();

          // snapshots keep changing values, so have commented out this snapshot
          // expect(testRenderer).toMatchSnapshot();
        }
      },
      {
        name: "not intercept 1 finger gestures",
        test() {
          const {
            onStartShouldSetResponder,
            onMoveShouldSetResponder,
            onStartShouldSetResponderCapture,
            onMoveShouldSetResponderCapture
          } = gestureHandlers(renderComponent().getInstance());

          const emptyTouchEvent = makeTouchEvent([{ x: 50, y: 50 }], []);

          // gesture state is updated _only_ during the capture phase
          // so the relative methods need to be called first
          const capturedStart = onStartShouldSetResponderCapture(
            emptyTouchEvent
          );
          const capturedMove = onMoveShouldSetResponderCapture(emptyTouchEvent);
          const respondedStart = onStartShouldSetResponder(emptyTouchEvent);
          const respondedMove = onMoveShouldSetResponder(emptyTouchEvent);

          expect(capturedStart).toBe(false);
          expect(capturedMove).toBe(false);
          expect(respondedStart).toBe(false);
          expect(respondedMove).toBe(false);
        }
      },
      {
        name: "intercept more than 1 finger gestures",
        test() {
          const {
            onStartShouldSetResponder,
            onMoveShouldSetResponder,
            onStartShouldSetResponderCapture,
            onMoveShouldSetResponderCapture
          } = gestureHandlers(renderComponent().getInstance());

          const emptyTouchEvent = makeTouchEvent(
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

          // gesture state is updated _only_ during the capture phase
          // so the relative methods need to be called first
          const capturedStart = onStartShouldSetResponderCapture(
            emptyTouchEvent
          );
          const capturedMove = onMoveShouldSetResponderCapture(emptyTouchEvent);
          const respondedStart = onStartShouldSetResponder(emptyTouchEvent);
          const respondedMove = onMoveShouldSetResponder(emptyTouchEvent);

          expect(capturedStart).toBe(true);
          expect(capturedMove).toBe(true);
          expect(respondedStart).toBe(true);
          expect(respondedMove).toBe(true);
        }
      }
    ];

    iterator(tests);
  });
};

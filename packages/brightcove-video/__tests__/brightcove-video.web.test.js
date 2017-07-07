/* eslint-env jest, browser */

import { View } from "react-native";
import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import BrightcoveVideo from "../brightcove-video.web";

describe("brightcove-video web component", () => {
  afterEach(() => {
    window.bc = null;
    window.videojs = null;
    delete window.bc;
    delete window.videojs;
    delete BrightcoveVideo.players;
    BrightcoveVideo.globalErrors = [];

    document.body.innerHTML = "";
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(<BrightcoveVideo accountId="[ACCOUNT_ID]" videoId="[VIDEO_ID]" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("appends script tag to body", () => {
    renderer
      .create(<BrightcoveVideo accountId="[ACCOUNT_ID]" videoId="[VIDEO_ID]" />)
      .toJSON();

    expect(document.body.innerHTML.trim()).toBe(
      '<script src="//players.brightcove.net/[ACCOUNT_ID]/default_default/index.min.js"></script>'
    );
  });

  it("will not append script tag to body if there has been a global error", () => {
    BrightcoveVideo.globalErrors.push({});

    renderer
      .create(<BrightcoveVideo accountId="[ACCOUNT_ID]" videoId="[VIDEO_ID]" />)
      .toJSON();

    expect(document.body.innerHTML.trim()).toBe("");
  });

  it("has width x height that default to 320 x 180", () => {
    const tree = renderer
      .create(<BrightcoveVideo accountId="[ACCOUNT_ID]" videoId="[VIDEO_ID]" />)
      .toJSON();

    expect(tree.children[0].props.width).toBe(320);
    expect(tree.children[0].props.height).toBe(180);
  });

  it("has width x height that can be overridden", () => {
    const tree = renderer
      .create(
        <BrightcoveVideo
          accountId="[ACCOUNT_ID]"
          videoId="[VIDEO_ID]"
          height={400}
          width={600}
        />
      )
      .toJSON();

    expect(tree.children[0].props.width).toBe(600);
    expect(tree.children[0].props.height).toBe(400);
  });

  it("generates the correct script link", () => {
    renderer
      .create(<BrightcoveVideo accountId="[ACCOUNT_ID]" videoId="[VIDEO_ID]" />)
      .toJSON();

    expect(document.body.innerHTML.trim()).toBe(
      '<script src="//players.brightcove.net/[ACCOUNT_ID]/default_default/index.min.js"></script>'
    );
  });

  it("passes accountId & videoId to video correctly", () => {
    const tree = renderer
      .create(<BrightcoveVideo accountId="[ACCOUNT_ID]" videoId="[VIDEO_ID]" />)
      .toJSON();

    expect(tree.children[0].props["data-video-id"]).toBe("[VIDEO_ID]");
    expect(tree.children[0].props["data-account"]).toBe("[ACCOUNT_ID]");
  });

  it("does not attempt to initialise the brightcove player before the script has loaded", () => {
    const initVideoSpy = jest.spyOn(BrightcoveVideo.prototype, "initVideo");

    renderer.create(
      <View>
        <BrightcoveVideo accountId="[ACCOUNT_ID1]" videoId="[VIDEO_ID1]" />
        <BrightcoveVideo accountId="[ACCOUNT_ID2]" videoId="[VIDEO_ID2]" />
      </View>
    );

    expect(initVideoSpy.mock.calls.length).toBe(0);

    initVideoSpy.mockRestore();
  });

  it("uses the initialise function once the script has loaded", () => {
    const readyMock = jest.fn();
    const onMock = jest.fn();
    const initVideoSpy = jest.spyOn(BrightcoveVideo.prototype, "initVideo");

    window.bc = jest.fn();
    window.videojs = jest.fn().mockReturnValue({
      ready: readyMock,
      on: onMock
    });

    renderer.create(
      <View>
        <BrightcoveVideo accountId="[ACCOUNT_ID]" videoId="[VIDEO_ID]" />
        <BrightcoveVideo accountId="[ACCOUNT_ID]" videoId="[VIDEO_ID]" />
      </View>
    );

    expect(initVideoSpy.mock.calls.length).toBe(2);
    expect(window.bc.mock.calls).toHaveLength(2);
    expect(window.videojs.mock.calls).toHaveLength(2);

    initVideoSpy.mockRestore();
  });

  describe("jsdom tests", () => {
    let reactWrapper;

    beforeEach(() => {
      reactWrapper = document.body.appendChild(document.createElement("div"));
    });

    afterEach(() => {
      document.body.removeChild(reactWrapper);
    });

    it("will emit an error if account id is wrong", done => {
      const component = (
        <BrightcoveVideo
          accountId="[X]"
          videoId="[VIDEO_ID]"
          onError={err => {
            expect(err).toMatchObject({
              code: "",
              message:
                "The script //players.brightcove.net/[X]/default_default/index.min.js is not accessible."
            });
            done();
          }}
        />
      );

      ReactDOM.render(component, reactWrapper);
    });

    describe("player events", () => {
      let dummyScript;
      let createScriptSpy;
      let appendScriptSpy;
      let dummyPlayer;

      beforeEach(() => {
        dummyScript = {};
        createScriptSpy = jest
          .spyOn(BrightcoveVideo.prototype, "createScript")
          .mockReturnValue(dummyScript);

        appendScriptSpy = jest
          .spyOn(BrightcoveVideo, "appendScript")
          .mockImplementation(() => {});

        dummyPlayer = {
          ready: fn => {
            setTimeout(() => {
              fn();
            }, 20);
          }
        };

        window.videojs = () => dummyPlayer;
      });

      afterEach(() => {
        createScriptSpy.mockRestore();
        appendScriptSpy.mockRestore();

        delete window.videojs;
      });

      it("will emit an error if the brightcove player emits an error", done => {
        dummyPlayer.error = () => ({
          code: "[CODE]",
          message: "[MESSAGE]"
        });

        dummyPlayer.on = (what, fn) => {
          if (what === "error") {
            fn();
          }
        };

        const component = (
          <BrightcoveVideo
            accountId="57838016001"
            videoId="[X]"
            onError={err => {
              expect(err).toMatchObject({
                code: "[CODE]",
                message: "[MESSAGE]"
              });
              done();
            }}
          />
        );

        ReactDOM.render(component, reactWrapper);

        setTimeout(() => {
          dummyScript.onload();
        }, 20);
      });

      describe("play / pause / seek", () => {
        let evtReg;

        beforeEach(() => {
          evtReg = {};

          dummyPlayer.on = (evtType, fn) => {
            evtReg[evtType] = fn;
          };
        });

        it("will emit a 'play' event", done => {
          dummyPlayer.currentTime = () => "Judgement Day";

          const component = (
            <BrightcoveVideo
              accountId="57838016001"
              videoId="[X]"
              onChange={state => {
                expect(state.playerStatus).toBe("playing");
                expect(state.playheadPosition).toBe("Judgement Day");

                done();
              }}
            />
          );

          ReactDOM.render(component, reactWrapper);

          setTimeout(() => {
            dummyScript.onload();

            setTimeout(() => {
              evtReg.play();
            }, 50);
          }, 50);
        });

        it("will emit a 'pause' event", done => {
          dummyPlayer.currentTime = () => "Super inflation";

          const component = (
            <BrightcoveVideo
              accountId="57838016001"
              videoId="[X]"
              onChange={state => {
                expect(state.playerStatus).toBe("paused");
                expect(state.playheadPosition).toBe("Super inflation");

                done();
              }}
            />
          );

          ReactDOM.render(component, reactWrapper);

          setTimeout(() => {
            dummyScript.onload();

            setTimeout(() => {
              evtReg.pause();
            }, 50);
          }, 50);
        });

        it("will emit a 'seeked' event", done => {
          dummyPlayer.currentTime = () => "Seek & ye will find";

          const component = (
            <BrightcoveVideo
              accountId="57838016001"
              videoId="[X]"
              onChange={state => {
                expect(state.playerStatus).toBe("paused");
                expect(state.playheadPosition).toBe("Seek & ye will find");

                done();
              }}
            />
          );

          ReactDOM.render(component, reactWrapper);

          setTimeout(() => {
            dummyScript.onload();

            setTimeout(() => {
              evtReg.seeked();
            }, 50);
          }, 50);
        });

        it("will not error if there is no change handler", done => {
          dummyPlayer.currentTime = () => "Seek & ye will find";

          const component = (
            <BrightcoveVideo accountId="57838016001" videoId="[X]" />
          );

          ReactDOM.render(component, reactWrapper);

          setTimeout(() => {
            dummyScript.onload();

            setTimeout(() => {
              evtReg.seeked();
              done();
            }, 50);
          }, 50);
        });

        it("will unmount cleanly", done => {
          dummyPlayer.dispose = jest.fn();

          const component = (
            <BrightcoveVideo accountId="57838016001" videoId="[X]" />
          );

          ReactDOM.render(component, reactWrapper);

          setTimeout(() => {
            dummyScript.onload();

            setTimeout(() => {
              ReactDOM.unmountComponentAtNode(reactWrapper);

              expect(dummyPlayer.dispose.mock.calls).toHaveLength(1);

              done();
            }, 50);
          }, 50);
        });

        it("will unmount cleanly if player not yet ready", () => {
          const component = (
            <BrightcoveVideo accountId="57838016001" videoId="[X]" />
          );

          ReactDOM.render(component, reactWrapper);
          ReactDOM.unmountComponentAtNode(reactWrapper);
        });
      });
    });
  });
});

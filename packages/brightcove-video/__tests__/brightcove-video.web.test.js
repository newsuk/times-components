import { View } from "react-native";
import React from "react";
import ReactDOM from "react-dom";
import BrightcoveVideo from "../brightcove-video.web";
import renderer from "react-test-renderer";

describe("brightcove-video web component", () => {
  afterEach(() => {
    delete window.bc;
    delete window.videojs;
    delete BrightcoveVideo.players;
    BrightcoveVideo.globalErrors = [];

    document.body.innerHTML = "";
  });

  it("renders correctly", () => {
    const tree = renderer.create(<BrightcoveVideo />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("appends script tag to body", () => {
    const tree = renderer.create(<BrightcoveVideo />).toJSON();

    expect(document.body.innerHTML.trim()).toBe(
      '<script src="//players.brightcove.net/undefined/default_default/index.min.js"></script>'
    );
  });

  it("will not append script tag to body if there has been a global error", () => {
    BrightcoveVideo.globalErrors.push({});

    const tree = renderer.create(<BrightcoveVideo />).toJSON();

    expect(document.body.innerHTML.trim()).toBe("");
  });

  it("width x height default to 320 x 180", () => {
    const tree = renderer.create(<BrightcoveVideo />).toJSON();

    expect(tree.children[0].props.width).toBe(320);
    expect(tree.children[0].props.height).toBe(180);
  });

  it("width x height can be overridden", () => {
    const tree = renderer
      .create(<BrightcoveVideo height={400} width={600} />)
      .toJSON();

    expect(tree.children[0].props.width).toBe(600);
    expect(tree.children[0].props.height).toBe(400);
  });

  it("generates the correct script link", () => {
    const tree = renderer
      .create(<BrightcoveVideo accountId="[ACCOUNT_ID]" />)
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

    const videos = () =>
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

    const videos = renderer.create(
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
      let dummyScript, createScript, appendScriptSpy, dummyPlayer;

      beforeEach(() => {
        dummyScript = {};
        createScriptSpy = jest
          .spyOn(BrightcoveVideo.prototype, "createScript")
          .mockReturnValue(dummyScript);

        appendScriptSpy = jest
          .spyOn(BrightcoveVideo.prototype, "appendScript")
          .mockImplementation(() => {});

        dummyPlayer = {};

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
        dummyPlayer.ready = () => ({});
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

        dummyScript.onload();
      });

      it("will emit a 'play' event", done => {
        const evtReg = {};

        dummyPlayer.currentTime = () => "Judgement Day";
        dummyPlayer.ready = fn => {
          fn();
        };
        dummyPlayer.on = (evtType, fn) => {
          evtReg[evtType] = fn;
        };

        const component = (
          <BrightcoveVideo
            accountId="57838016001"
            videoId="[X]"
            onChange={state => {
              expect(state.playerStatus).toBe("playing");
              done();
            }}
          />
        );

        ReactDOM.render(component, reactWrapper);

        dummyScript.onload();

        evtReg.play();
      });
    });
  });
});

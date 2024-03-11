/* eslint-disable react/prop-types */
import React from "react";
import Video from "./src/video";

const id = "3dbfe6b8-680b-11e9-b277-88f3d445182c";
const policyKey =
  "BCpkADawqM0NK0Rq8n6sEQyWykemrqeSmIQqqVt3XBrdpl8TYlvqN3hwKphBJRnkPgx6WAbozCW_VgTOBCNf1AQRh8KnmXSXfveQalRc5-pyNlSod5XzP99If2U";
const accountId = "5436121857001";
const videoId = "5831024132001";
const posterImageURI =
  "https://cf-images.eu-west-1.prod.boltdns.net/v1/static/5436121857001/5b0db6f6-a899-4ad8-b42f-4ab0af99505e/904aca55-79ca-4a4f-8d19-46c3a68c0700/1280x720/match/image.jpg";

const defaultVideoProps = {
  accountId,
  height: 180,
  id,
  is360: false,
  onVideoPress: () => {
    // eslint-disable-next-line no-console
    console.log("onVideoPress called");
  },
  policyKey,
  poster: {
    uri: posterImageURI
  },
  videoId,
  width: 320
};

const mockId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";

export default {
  children: [
    {
      component: () => (
        <div>
          <div
            style={{
              marginBottom: 10,
              marginTop: 10
            }}
          >
            Mobile size:
          </div>
          <Video {...defaultVideoProps} />
          <div
            style={{
              marginBottom: 10,
              marginTop: 20
            }}
          >
            Tablet size:
          </div>
          <Video {...defaultVideoProps} width={498} height={280} />

          <div
            style={{
              marginBottom: 10,
              marginTop: 20
            }}
          >
            Desktop size:
          </div>
          <Video {...defaultVideoProps} width={760} height={427} />
        </div>
      ),
      name: "default player",
      type: "story"
    },
    {
      component: () => {
        const props = {
          playerId: "y4yoiFCf1",
          videoId: "5992442066001",
          is360: true
        };
        return (
          <div>
            <div
              style={{
                marginBottom: 10,
                marginTop: 10
              }}
            >
              Mobile size:
            </div>
            <Video {...defaultVideoProps} {...props} />
            <div
              style={{
                marginBottom: 10,
                marginTop: 20
              }}
            >
              Desktop size:
            </div>
            <Video
              {...defaultVideoProps}
              {...props}
              width={768}
              height={432}
              id={mockId}
            />
          </div>
        );
      },
      name: "360 player",
      platform: "web",
      type: "story"
    },
    {
      component: () => (
        <div>
          <Video {...defaultVideoProps} />
          <div style={{ height: 20 }} />
          <Video {...defaultVideoProps} videoId="5612887446001" id={mockId} />
        </div>
      ),
      name: "two players with different videos",
      type: "story"
    },
    {
      component: () => (
        <div
          style={{
            height: "100%",
            width: "100%"
          }}
        >
          <Video {...defaultVideoProps} height="100%" width="100%" />
        </div>
      ),
      name: "100% width and height",
      platform: "web",
      type: "story"
    },
    {
      component: () => (
        <div
          style={{
            height: "100vh",
            overflow: "hidden",
            width: "100vw"
          }}
        >
          <Video {...defaultVideoProps} height="100%" width="100%" />
        </div>
      ),
      name: "100% width and height",
      platform: "web",
      type: "story"
    },
    {
      component: () => (
        <div>
          <div
            style={{
              marginBottom: 10,
              marginTop: 10
            }}
          >
            Mobile size:
          </div>
          <Video {...defaultVideoProps} videoId="invalid id" />
          <div
            style={{
              marginBottom: 10,
              marginTop: 20
            }}
          >
            Desktop size:
          </div>
          <Video
            {...defaultVideoProps}
            height={374}
            videoId="invalid id"
            width={664}
          />
        </div>
      ),
      name: "with error",
      platform: "web",
      type: "story"
    },
    {
      component: () => (
        <div>
          <div
            style={{
              marginBottom: 10,
              marginTop: 10
            }}
          >
            Mobile size:
          </div>
          <Video {...defaultVideoProps} poster={null} />
          <div
            style={{
              marginBottom: 10,
              marginTop: 20
            }}
          >
            Desktop size:
          </div>
          <Video
            {...defaultVideoProps}
            height={374}
            poster={null}
            width={664}
          />
        </div>
      ),
      name: "no poster image",
      type: "story"
    }
  ],
  name: "Primitives/Video"
};

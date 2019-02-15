/* eslint-disable react/prop-types */
import React from "react";
import { ScrollView, View } from "react-native";
import {
  CommentLeadAndCartoon,
  LeadOneAndFourSlice,
  LeadOneAndOneSlice,
  LeadOneAndTwoSlice,
  LeadTwoNoPicAndTwoSlice,
  OpinionOneAndTwoSlice,
  StandardSlice,
  SecondaryFourSlice,
  SecondaryOneAndFourSlice,
  SecondaryTwoAndTwoSlice,
  SecondaryTwoNoPicAndTwoSlice,
  Leaders,
  ListTwoAndSixNoPic
} from "./src/slice-layout";

const colours = [
  { backgroundColor: "yellow", id: 1 },
  { backgroundColor: "green", id: 2 },
  { backgroundColor: "red", id: 3 },
  { backgroundColor: "blue", id: 4 }
];

const createItems = noOfItems =>
  colours
    .map(colour => {
      const { backgroundColor, id } = colour;
      if (id > noOfItems) return false;
      return (
        <View
          id={`item-${id}`}
          style={[{ minHeight: 150 }, { backgroundColor }]}
        />
      );
    })
    .filter(item => item !== false);

const Support1 = () => (
  <View style={[{ minHeight: 150 }, { backgroundColor: "green" }]} />
);

const Support2 = () => (
  <View style={[{ minHeight: 150 }, { backgroundColor: "yellow" }]} />
);

const Support3 = () => (
  <View style={[{ minHeight: 150 }, { backgroundColor: "red" }]} />
);

const Support4 = () => (
  <View style={[{ minHeight: 150 }, { backgroundColor: "blue" }]} />
);

export default {
  children: [
    {
      component: () => (
        <ScrollView>
          <LeadOneAndFourSlice
            renderLead={() => <Support3 id="support1" />}
            renderSupport1={() => <Support1 id="support2" />}
            renderSupport2={() => <Support2 id="support3" />}
            renderSupport3={() => <Support3 id="support4" />}
            renderSupport4={() => <Support4 id="support5" />}
          />
        </ScrollView>
      ),
      name: "LeadOneAndFour",
      type: "story"
    },
    {
      component: () => (
        <ScrollView>
          <LeadOneAndOneSlice
            renderLead={() => (
              <View
                id="lead"
                style={{
                  backgroundColor: "red",
                  minHeight: 320
                }}
              />
            )}
            renderSupport={() => <Support1 id="support1" />}
          />
        </ScrollView>
      ),
      name: "LeadOneAndOne",
      type: "story"
    },
    {
      component: () => (
        <ScrollView>
          <LeadOneAndTwoSlice
            renderLead={() => (
              <View
                id="lead"
                style={{
                  backgroundColor: "red",
                  minHeight: 320
                }}
              />
            )}
            renderSupport1={() => null}
            renderSupport2={() => null}
          />
        </ScrollView>
      ),
      name: "LeadOneAndTwo",
      type: "story"
    },
    {
      component: () => (
        <ScrollView>
          <LeadOneAndTwoSlice
            renderLead={() => (
              <View
                id="lead"
                style={{
                  backgroundColor: "red",
                  minHeight: 320
                }}
              />
            )}
            renderSupport1={() => <Support1 id="support1" />}
            renderSupport2={() => null}
          />
        </ScrollView>
      ),
      name: "LeadOneAndTwo With 1 Support",
      type: "story"
    },
    {
      component: () => (
        <ScrollView>
          <LeadOneAndTwoSlice
            renderLead={() => (
              <View
                id="lead"
                style={{
                  backgroundColor: "red",
                  minHeight: 320
                }}
              />
            )}
            renderSupport1={() => <Support1 id="support1" />}
            renderSupport2={() => <Support2 id="support2" />}
          />
        </ScrollView>
      ),
      name: "LeadOneAndTwo With 2 Supports",
      type: "story"
    },
    {
      component: () => (
        <ScrollView>
          <OpinionOneAndTwoSlice
            renderOpinion={() => (
              <View
                id="opinion"
                style={{
                  backgroundColor: "red",
                  minHeight: 150
                }}
              />
            )}
            renderSupport1={() => null}
            renderSupport2={() => null}
          />
        </ScrollView>
      ),
      name: "OpinionOneAndTwo",
      type: "story"
    },
    {
      component: () => (
        <ScrollView>
          <OpinionOneAndTwoSlice
            renderOpinion={() => (
              <View
                id="opinion"
                style={{
                  backgroundColor: "red",
                  minHeight: 150
                }}
              />
            )}
            renderSupport1={() => <Support1 id="support1" />}
            renderSupport2={() => null}
          />
        </ScrollView>
      ),
      name: "OpinionOneAndTwo With 1 Support",
      type: "story"
    },
    {
      component: () => (
        <ScrollView>
          <OpinionOneAndTwoSlice
            renderOpinion={() => (
              <View
                id="opinion"
                style={{
                  backgroundColor: "red",
                  minHeight: 150
                }}
              />
            )}
            renderSupport1={() => <Support1 id="support1" />}
            renderSupport2={() => <Support2 id="support2" />}
          />
        </ScrollView>
      ),
      name: "OpinionOneAndTwo With 2 Supports",
      type: "story"
    },
    {
      component: () => (
        <ScrollView>
          <SecondaryFourSlice
            renderSecondary1={() => <Support1 id="support1" />}
            renderSecondary2={() => <Support2 id="support2" />}
            renderSecondary3={() => <Support3 id="support3" />}
            renderSecondary4={() => <Support4 id="support4" />}
          />
        </ScrollView>
      ),
      name: "SecondaryFourSlice",
      type: "story"
    },
    {
      component: () => (
        <ScrollView>
          <SecondaryTwoAndTwoSlice
            renderSecondary1={() => <Support1 id="support1" />}
            renderSecondary2={() => <Support2 id="support2" />}
            renderSupport1={() => <Support3 id="support3" />}
            renderSupport2={() => <Support4 id="support4" />}
            renderSupport3={() => <Support1 id="support5" />}
            renderSupport4={() => <Support2 id="support6" />}
          />
        </ScrollView>
      ),
      name: "SecondaryTwoAndTwoSlice",
      type: "story"
    },
    {
      component: () => (
        <ScrollView>
          <SecondaryOneAndFourSlice
            renderSecondary={() => <Support1 id="support1" />}
            renderSupport1={() => <Support2 id="support2" />}
            renderSupport2={() => <Support3 id="support3" />}
            renderSupport3={() => <Support4 id="support4" />}
            renderSupport4={() => <Support1 id="support5" />}
          />
        </ScrollView>
      ),
      name: "SecondaryOneAndFourSlice",
      type: "story"
    },
    {
      component: () => (
        <ScrollView>
          <SecondaryTwoNoPicAndTwoSlice
            renderSecondary1={() => <Support1 id="support1" />}
            renderSecondary2={() => <Support2 id="support2" />}
            renderSupport1={() => <Support3 id="support3" />}
            renderSupport2={() => <Support4 id="support4" />}
          />
        </ScrollView>
      ),
      name: "SecondaryTwoNoPicAndTwoSlice",
      type: "story"
    },
    {
      component: () => (
        <ScrollView>
          <LeadTwoNoPicAndTwoSlice
            renderLead1={() => <Support1 id="support1" />}
            renderLead2={() => <Support2 id="support2" />}
            renderSupport1={() => <Support3 id="support3" />}
            renderSupport2={() => <Support4 id="support4" />}
          />
        </ScrollView>
      ),
      name: "LeadTwoNoPicAndTwoSlice",
      type: "story"
    },
    {
      component: () => (
        <ScrollView>
          <ListTwoAndSixNoPic
            renderLead1={() => <Support3 id="support1" />}
            renderLead2={() => <Support4 id="support2" />}
            renderSupport1={() => <Support1 id="support3" />}
            renderSupport2={() => <Support2 id="support4" />}
            renderSupport3={() => <Support3 id="support5" />}
            renderSupport4={() => <Support4 id="support6" />}
            renderSupport5={() => <Support1 id="support7" />}
            renderSupport6={() => <Support2 id="support8" />}
          />
        </ScrollView>
      ),
      name: "ListTwoAndSixNoPic",
      type: "story"
    },
    {
      component: () => (
        <ScrollView>
          <Leaders
            renderLeader1={() => <Support1 id="support1" />}
            renderLeader2={() => <Support2 id="support2" />}
            renderLeader3={() => <Support3 id="support3" />}
          />
        </ScrollView>
      ),
      name: "Leaders",
      type: "story"
    },
    {
      component: () => (
        <ScrollView>
          <CommentLeadAndCartoon
            renderLead={() => <Support1 id="support1" />}
            renderCartoon={() => <Support2 id="support2" />}
          />
        </ScrollView>
      ),
      name: "CommentLeadAndCartoon",
      type: "story"
    },
    {
      component: ({ select }) => {
        const itemCount = {
          0: "0",
          1: "1",
          2: "2",
          3: "3"
        };

        return (
          <ScrollView>
            <StandardSlice
              itemCount={Number(select("Number of items:", itemCount, "3"))}
              renderItems={() =>
                createItems(select("Number of items:", itemCount, "3"))
              }
            />
          </ScrollView>
        );
      },
      name: "Standard",
      type: "story"
    }
  ],
  name: "Primitives/Slice Layout"
};

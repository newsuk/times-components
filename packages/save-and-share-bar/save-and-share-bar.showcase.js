import React from "react";
import SaveAndShareBar from "./src/save-and-share-bar";

const window = {
  nuk: {
    graphqlapi: {
      url: "https://prod-tpa.prod.thetimes.works/graphql"
    },
    getCookieValue: (cookie_name) => {
      switch(cookie_name) {
        case 'acs_tnl': return "tid%3D77a8739a-fbad-4344-9bf8-09c33a49ed6b%26eid%3DAAAA002920174%26e%3D1%26a%3DTmVoYSBTcml2YXN0YXZh%26u%3D1910c402-2cf6-40dd-bb1e-4ee24e1e7f6b%26t%3D1554976444%26h%3D5f091672fb6e3258934b91f8715e2753"
        case 'sacs_tnl': return "1ff9a858-8f31-43f3-bb8a-4366dfcb858e"
      }
    }
  }
}

export default {
  children: [
    {
      component: () => (
        <SaveAndShareBar
          articleId="id-123"
          articleHeadline="test-headline"
          articleUrl="https://www.thetimes.co.uk/"
          onCopyLink={() => {}}
          onSaveToMyArticles={() => {}}
          onShareOnEmail={() => {}}
        />
      ),
      name: "Save snd Share bar",
      type: "story"
    }
  ],
  name: "Composed/Save and Share bar"
};

import React from "react";
import Card from "@times-components/card";

const AuthorProfileItem = item => {
  const props = {
    date: item.publishedTime,
    headline: item.title,
    image: {
      uri:
        "https://www.thetimes.co.uk/imageserver/image/methode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2F9242e576-4dfc-11e7-a20e-a11097d3353d.jpg?crop=1463%2C975%2C293%2C12&resize=320"
    },
    text: JSON.parse(item.teaser),
    label: item.label,
    publication: item.publicationName
  };

  return <Card {...props} />;
};

export default AuthorProfileItem;

import React from "react";
import AuthorHead from "@times-components/author-head";

export default () => {
  const props = {
    bio: [],
    uri: "",
    twitter: "",
    title: "",
    name: ""
  };

  return <AuthorHead {...props} />;
};

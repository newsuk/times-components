import React from "react";
import AuthorPhotoBase from "./author-photo.base";

const AuthorPhoto = props => (
  <AuthorPhotoBase {...props} style={{ width: 100, borderRadius: 50 }} />
);

export default AuthorPhoto;

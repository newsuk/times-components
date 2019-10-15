import React from "react";
import PropTypes from "prop-types";

const HomePage = ({ id }) => (
  <div>
    <h1>Home Page</h1>
    <span>EditionID: {id}</span>
  </div>
);

HomePage.propTypes = {
  id: PropTypes.string.isRequired,
};

export default HomePage;

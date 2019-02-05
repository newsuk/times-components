import React from "react";
import PropTypes from "prop-types";
import { ListTwoAndSixNoPic } from "@times-components/slice-layout";
import { TileL, TileC } from "../../tiles";

const ListTwoAndSixNoPicSlice = ({
  lead1,
  lead2,
  support1,
  support2,
  support3,
  support4,
  support5,
  support6
}) => (
  <ListTwoAndSixNoPic
    renderLead1={() => <TileC tile={lead1} />}
    renderLead2={() => <TileC tile={lead2} />}
    renderSupport1={() => <TileL tile={support1} />}
    renderSupport2={() => <TileL tile={support2} />}
    renderSupport3={() => <TileL tile={support3} />}
    renderSupport4={() => <TileL tile={support4} />}
    renderSupport5={() => <TileL tile={support5} />}
    renderSupport6={() => <TileL tile={support6} />}
  />
);

ListTwoAndSixNoPicSlice.propTypes = {
  lead1: PropTypes.shape({}).isRequired,
  lead2: PropTypes.shape({}).isRequired,
  support1: PropTypes.shape({}).isRequired,
  support2: PropTypes.shape({}).isRequired,
  support3: PropTypes.shape({}).isRequired,
  support4: PropTypes.shape({}).isRequired,
  support5: PropTypes.shape({}).isRequired,
  support6: PropTypes.shape({}).isRequired
};

export default ListTwoAndSixNoPicSlice;

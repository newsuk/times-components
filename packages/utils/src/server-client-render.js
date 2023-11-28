/**
 * This is a component to allow you to render different UI on the server/client
 * in a server-side-render compatible manner.
 *
 * Without this, you could break React hydration as
 * it could cause a difference between the initial renders
 * on the front end and on the server.
 *
 * This uses two-pass rendering to prevent differences in the
 * initial render on server and client.
 *
 * https://reactjs.org/docs/react-dom.html#hydrate
 */
import { Component } from "react";
import PropTypes from "prop-types";

class ServerClientRender extends Component {
  constructor(props) {
    super(props);
    this.state = { isClient: false };
  }

  componentDidMount() {
    this.setState({ isClient: true });
  }

  render() {
    const { isClient } = this.state;
    const { client, server } = this.props;

    return isClient ? client && client() : server && server();
  }
}

ServerClientRender.propTypes = {
  server: PropTypes.func,
  client: PropTypes.func
};

ServerClientRender.defaultProps = {
  server: null,
  client: null
};

export default ServerClientRender;

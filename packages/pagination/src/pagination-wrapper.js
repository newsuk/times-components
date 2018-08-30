/* eslint-env browser */

import React, { Component } from "react";
import PropTypes from "prop-types";
import getDisplayName from "react-display-name";

export default PaginatedComponent => {
  class Helper extends Component {
    static addHistory(page) {
      if (typeof window !== "undefined" && window.history) {
        window.history.pushState({ page }, null, `?page=${page}`);
      }
    }

    static replaceHistory(page) {
      if (typeof window !== "undefined" && window.history) {
        window.history.replaceState({ page }, null, `?page=${page}`);
      }
    }

    static getDerivedStateFromProps(props, state) {
      return {
        ...props,
        page: state.page
      };
    }

    constructor(props) {
      super(props);
      this.state = props;

      this.handleChangePage = this.handleChangePage.bind(this);
    }

    componentDidMount() {
      if (typeof window !== "undefined") {
        window.onpopstate = event => {
          if (event.state) {
            this.setState({
              page: event.state.page
            });
          }
        };
      }

      Helper.replaceHistory(this.state.page);
    }

    componentWillUnmount() {
      if (typeof window !== "undefined") {
        window.onpopstate = null;
      }
    }

    handleChangePage(event, page) {
      this.setState({ page }, () => Helper.addHistory(page));
      event.preventDefault();
    }

    render() {
      return (
        <PaginatedComponent
          {...this.state}
          onNext={this.handleChangePage}
          onPrev={this.handleChangePage}
        />
      );
    }
  }

  Helper.displayName = `Pagination Helper (${getDisplayName(
    PaginatedComponent
  )})`;
  Helper.propTypes = {
    page: PropTypes.number
  };

  Helper.defaultProps = {
    page: 1
  };

  return Helper;
};

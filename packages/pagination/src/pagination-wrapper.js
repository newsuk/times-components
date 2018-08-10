import React, { Component } from "react";
import PropTypes from "prop-types";
import getDisplayName from "react-display-name";

export default PaginatedComponent => {
  class Helper extends Component {
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

    handleChangePage(event, page) {
      this.setState({ page });
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

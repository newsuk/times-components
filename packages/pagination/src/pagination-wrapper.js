import React, { Component } from "react";
import PropTypes from "prop-types";
import getDisplayName from "react-display-name";

export default PaginatedComponent => {
  class Helper extends Component {
    constructor(props) {
      super(props);
      this.state = props;

      this.handleChangePage = this.handleChangePage.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      return this.setState(
        Object.assign({}, nextProps, {
          page: this.state.page
        })
      );
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

import React, { Component } from "react";
import PropTypes from "prop-types";

class ActivatePreviewImage extends Component {
    getChildContext() {
        return {
            previewImageActivated: true
        }
    }

    render() {
        return this.props.children;
    }
}

export const activatePreviewImageContextTypes = {
    previewImageActivated: PropTypes.bool
}

ActivatePreviewImage.childContextTypes = activatePreviewImageContextTypes

export const activatePreviewImage = (WrappedComponent) => (props) => (
    <ActivatePreviewImage>
        <WrappedComponent {...props} />
    </ActivatePreviewImage>
)

/* eslint-env browser */
import { Component } from "react";
import PropTypes from "prop-types";

class LazyLoad extends Component {
  constructor(props) {
    super(props);

    this.isObserving = false;
    this.pending = new Set();
    this.pendingTimer = null;
    this.state = {
      clientHasRendered: false,
      nodes: new Map()
    };
    this.unobserved = new Set();
    this.unobservedTimer = null;
    this.registerNode = this.registerNode.bind(this);

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    this.isObserving = true;

    const options = {
      rootMargin: props.rootMargin,
      threshold: props.threshold
    };

    this.observer = new window.IntersectionObserver(
      this.handleObservation.bind(this),
      options
    );
  }

  componentDidMount() {
    const newState = {
      clientHasRendered: true
    };

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState(newState);
  }

  componentWillUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }

    clearTimeout(this.pendingTimer);
    clearTimeout(this.unobservedTimer);

    this.pending.clear();
    this.unobserved.clear();
  }

  handleObservation(entries) {
    const { threshold } = this.props;
    const { nodes } = this.state;

    entries.forEach(({ target, intersectionRatio }) => {
      if (intersectionRatio >= threshold && !nodes.get(target.id)) {
        this.pending.add(target);
      } else if (intersectionRatio < threshold && this.pending.has(target)) {
        this.pending.delete(target);
      }
    });

    clearTimeout(this.pendingTimer);

    if (this.pending.size) {
      this.pendingTimer = setTimeout(() => {
        if (!this.pending.size) {
          return;
        }

        this.setState(state => ({
          nodes: new Map([
            ...state.nodes,
            ...[...this.pending].map(n => [n.id, n])
          ])
        }));

        this.pending.clear();
      }, 100);
    }
  }

  registerNode(node) {
    if (!node) {
      return;
    }

    if (!this.observer) {
      if (this.unobserved.has(node)) {
        return;
      }

      this.unobserved.add(node);

      clearTimeout(this.unobservedTimer);

      this.unobservedTimer = setTimeout(() => {
        this.setState({
          nodes: new Map([...this.unobserved].map(n => [n.id, n]))
        });
        this.unobserved.clear();
      }, 10);

      return;
    }

    this.observer.observe(node);
  }

  render() {
    const { children } = this.props;
    const { clientHasRendered, nodes } = this.state;

    return children({
      clientHasRendered,
      isObserving: this.isObserving,
      observed: nodes,
      registerNode: this.registerNode
    });
  }
}

LazyLoad.propTypes = {
  children: PropTypes.func.isRequired,
  rootMargin: PropTypes.string,
  threshold: PropTypes.number.isRequired
};

LazyLoad.defaultProps = {
  rootMargin: "0px"
};

export default LazyLoad;

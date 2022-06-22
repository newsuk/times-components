import sharedStyles from "./shared";

const styles = (scale, breakpoint) => ({
    ...sharedStyles(scale, breakpoint),
    messageManager: {
      ...sharedStyles(scale, breakpoint).messageManager,
      position: "fixed",
      left: 0
    }
  });

export default styles;

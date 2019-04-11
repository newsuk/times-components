export default class Penalty {
  width = 0;

  penalty = 0;

  flagged = 0;

  type = "penalty";

  constructor(props = {}) {
    Object.assign(this, props);
  }
}

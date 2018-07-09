/* global it */
const iterator = tests =>
  tests.map(({ name, test }, indx) => {
    const index = indx + 1;
    it(`${index}. ${name.toLowerCase()}`, () => test());
    return true;
  });

export default iterator;

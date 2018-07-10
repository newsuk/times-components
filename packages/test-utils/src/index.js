/* global it */
const iterator = tests =>
  tests.forEach(({ name, test }, indx) => {
    const index = indx + 1;
    it(`${index}. ${name.toLowerCase()}`, () => test());
  });

export default iterator;

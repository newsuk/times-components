export default (transformer = e => e) => ({
  analytics(e) {
    const transformed = transformer(e);

    if (!transformed) {
      return;
    }

    console.log(
      `%c ${transformed.object}-${transformed.action}: ${JSON.stringify(
        transformed
      )}`,
      `color: blue`
    );
  }
});

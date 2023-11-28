export default (genConfig, iterations = 1) =>
  new Array(iterations).fill(0).reduce((configs, _, indx) => {
    const config = genConfig(indx + 1);

    if (config.error) {
      return [
        ...configs,
        config,
        {
          ...config,
          error: null
        }
      ];
    }

    return [...configs, config];
  }, []);

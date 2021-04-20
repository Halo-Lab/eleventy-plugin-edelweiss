const { resolve } = require('path');

module.exports = {
  /**
   * Engine for Eleventy to process Edelweiss templates.
   * They need to be written as ES modules.
   */
  engine: {
    // Disallow Eleventy to read templates.
    read: false,
    // Eleventy will try to get _data_ from template.
    getData: true,
    init: async () => import('@prostory/edelweiss-ssr'),
    // Used to get _data_ from template.
    getInstanceFromInputPath: async (inputPath) => import(resolve(inputPath)),
    compile: (permalink, inputPath) => async (data) => {
      if (permalink) {
        return typeof permalink === 'function' ? permalink(data) : permalink;
      }

      return import(resolve(inputPath)).then(({ render }) =>
        import('@prostory/edelweiss').then(({ renderToString }) =>
          renderToString(render(data))
        )
      );
    },
  },
};

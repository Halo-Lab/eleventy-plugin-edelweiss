const { resolve } = require('path');

const { engine } = require('./engine');
const { TEMPLATE_EXTENSION } = require('./constants');

module.exports.edelweissEngine = (config) => {
  config.addTemplateFormats(TEMPLATE_EXTENSION);

  config.addExtension(TEMPLATE_EXTENSION, engine);

  config.on('beforeWatch', (changedFiles = []) =>
    changedFiles
      .filter((file) => file.endsWith(TEMPLATE_EXTENSION))
      .forEach((file) => {
        for (const fullPath in require.cache) {
          if (fullPath === resolve(file)) {
            delete require.cache[fullPath];
          }
        }
      })
  );
};

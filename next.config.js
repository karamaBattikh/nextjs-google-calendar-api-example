const Dotenv = require("dotenv-webpack");
const path = require("path");

module.exports = {
  webpack: (config) => {
    // Add the new plugin to the existing webpack plugins
    config.resolve.alias.components = path.join(__dirname, "components");
    config.plugins.push(new Dotenv({ silent: true }));

    return config;
  },
};

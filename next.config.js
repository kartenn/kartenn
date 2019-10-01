// See https://jaketrent.com/post/environment-variables-in-nextjs/
// and https://zeit.co/blog/next5-1#environment-configuration

const { parsed: localEnv } = require("dotenv").config()

const webpack = require("webpack")
const withSass = require("@zeit/next-sass")

module.exports = withSass({
  webpack(config) {
    // Loading plugin for using environment variable in JS code.
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv))

    return config
  },
});

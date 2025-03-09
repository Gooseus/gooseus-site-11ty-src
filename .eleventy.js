var markdownItAttrs = require("markdown-it-attrs");
// Import the EJS plugin
const ejsPlugin = require("@11ty/eleventy-plugin-ejs");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy("favicon.png");
  eleventyConfig.addPassthroughCopy("files");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("resume/css");
  eleventyConfig.addPassthroughCopy("resume/images");

  eleventyConfig.amendLibrary("md", mdLib => mdLib.use(markdownItAttrs));

  eleventyConfig.setServerOptions({
    https: {
      key: "./localdev.goose.us+4-key.pem",
      cert: "./localdev.goose.us+4.pem",
    },
  });

  // Add the EJS plugin
  eleventyConfig.addPlugin(ejsPlugin);

  return {
    dir: {
      input: ".",
      output: process.env.BUILD_ENV === "production" ? "../gooseus.github.io" : "public",
    },
  };
};

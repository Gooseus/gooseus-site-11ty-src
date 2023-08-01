var markdownItAttrs = require("markdown-it-attrs");

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
      key: "./localdev.goose.us+3-key.pem",
      cert: "./localdev.goose.us+3.pem",
    },
  });

  return {
    dir: {
      input: ".",
      output: process.env.BUILD_ENV === "production" ? "../gooseus.github.io" : "public",
    },
  };
};

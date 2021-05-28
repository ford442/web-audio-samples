const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addShortcode('version', () => String(Date.now()));

  // See: https://www.11ty.dev/docs/plugins/syntaxhighlight/
  eleventyConfig.addPlugin(syntaxHighlight);

  if (process.env.ELEVENTY_PRODUCTION) {
    // eleventyConfig.addTransform('htmlminifier', {});
  } else {
    // eleventyConfig.setBrowserSyncConfig({});
  }

  // passthrough
  eleventyConfig.addPassthroughCopy({'src/static': 'static'});
  eleventyConfig.addPassthroughCopy({'src/images': 'images'});
  eleventyConfig.addPassthroughCopy({'src/js': 'js'});
  eleventyConfig.addPassthroughCopy({'src/audio-worklet': 'audio-worklet'});
  eleventyConfig.addPassthroughCopy({
    'src/box2d-stress-test': 'box2d-stress-test'
  });
  eleventyConfig.addPassthroughCopy({'src/vintage-demos': 'vintage-demos'});
  
  // watch
  eleventyConfig.addWatchTarget('./src/styles/');

  return {
    dir: {input: 'src'}
  };
};

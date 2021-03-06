/*
 * grunt-preprocessor
 * https://github.com/STAH/grunt-preprocessor
 *
 * Copyright (c) 2013 Stanislav Lesnikov
 * Licensed under the MIT license.
 * https://github.com/STAH/grunt-preprocessor/blob/master/LICENSE-MIT
 */


module.exports = function (grunt) {
  "use strict";

  grunt.registerMultiTask("preprocessor", "Grunt task to preprocess JS files.", function () {

    var options = this.data,
      root = options.root || '.',
      src = options.src,
      dest = options.dest;

    var sourceCode = grunt.file.read("./" + src, root);
    var sourceCompiled = process(sourceCode, root);

    grunt.file.write(dest, sourceCompiled);
    grunt.log.write("[preprocessor] Processed " + src + " => " + dest);
  });

  function process(source, root) {
    var Preprocessor = require("preprocessor");

    var pp = new Preprocessor(source, root);

    try {
      return pp.process({
        FULL: true
      });
    } catch (e) {
      grunt.log.error(e);
      grunt.fail.warn("processor failed to process.");
    }

    return '';
  }
};

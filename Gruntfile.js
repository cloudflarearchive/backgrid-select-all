/*
  backgrid-select-all
  http://github.com/wyuenho/backgrid-select-all

  Copyright (c) 2013 Jimmy Yuen Ho Wong and contributors
  Licensed under the MIT license.
*/

// jshint globalstrict:true, node:true

"use strict";

module.exports = function (grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON("package.json"),

    clean: {
      options: {
        force: true
      },
      api: [
        "api/**/*"
      ],
      "default": [
        "*.min.*",
        "test/coverage/**/*"
      ]
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },

    jsduck: {
      main: {
        src: ["backgrid-select-all.js"],
        dest: "api",
        options: {
          "external": ["Backbone.Model,Backbone.Collection,Backbone.View,Backgrid.Grid,Backgrid.Column"],
          "title": "backgrid-select-all",
          "no-source": true,
          "categories": "categories.json",
          "warnings": "-no_doc",
          "pretty-json": true
        }
      }
    },

    recess: {
      csslint: {
        options: {
          compile: true
        },
        files: {
          "backgrid-select-all.css": ["backgrid-select-all.css"]
        }
      },
      "default": {
        options: {
          compress: true
        },
        files: {
          "backgrid-select-all.min.css": ["backgrid-select-all.css"]
        }
      }
    },

    uglify: {
      options: {
        mangle: true,
        compress: true,
        preserveComments: "some"
      },
      "default": {
        files: {
          "backgrid-select-all.min.js": ["backgrid-select-all.js"]
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-recess");
  grunt.loadNpmTasks("grunt-jsduck");
  grunt.loadNpmTasks("grunt-karma");

  grunt.registerTask("dist", ["uglify", "recess"]);
  grunt.registerTask("default", ["clean", "jsduck", "dist", "karma"]);
};

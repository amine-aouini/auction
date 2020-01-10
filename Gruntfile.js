module.exports = function(grunt) {
  grunt.initConfig({
    shell: {
      add: {
        command: "git add ."
      },
      commit: {
        command: msg => {
          var msg = grunt.option("myParam") || "";
          return `git commit -m \"commited by grunt gang  ${msg} \"`;
        }
      },
      push: {
        command: "git push origin master"
      }
    },
    concat: {
      options: {
        separator: ";"
      },
      dist: {
        src: [
          "*.js",
          ["Database/**/*.js"],
          ["routes/**/*.js"],
          ["client/**/*.js"]
        ],
        dest: "dist/built.js"
      }
    },
    uglify: {
      options: {
        compress: true,
        mangle: true,
        sourceMap: true
      },
      target: {
        src: [
          "*.js",
          ["Database/**/*.js"],
          ["routes/**/*.js"],
          ["client/public/**/*.js"],
          ["client/src/**/*.js"]
        ],
        dest: "dist/built.js"
      }
    },
    jshint: {
      options: {
        curly: true,
        eqnull: true,
        eqeqeq: true,
        undef: true,
        globals: {
          jQuery: true
        },
        esversion: 6
      },
      all: [
        "Gruntfile.js",
        "client/src/**/*.js",
        "client/public/**/*.js",
        "routes/**/*.js"
      ]
    }
  });
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify-es");
  grunt.loadNpmTasks("grunt-shell");
  grunt.registerTask("default", ["uglify"]);

  grunt.registerTask("jshint", ["jshint"]);
  grunt.registerTask("git", ["shell:add", "shell:commit", "shell:push"]); //example grunt git --myParam=ur_msg_in_this_form
};

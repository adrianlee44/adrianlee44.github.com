module.exports = (grunt) ->
  grunt.loadNpmTasks "grunt-contrib-connect"
  grunt.initConfig
    pkg: grunt.file.readJSON "package.json"

    connect:
      server:
        options:
          port:      9001
          debug:     true
          hostname:  "*"
          keepalive: true
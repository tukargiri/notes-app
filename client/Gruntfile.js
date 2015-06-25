'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        serve: {
            options: {
                port: 9000,
            }
        }
    });

    grunt.loadNpmTasks('grunt-serve');

    grunt.registerTask('server', [
        'serve'
    ]);
    /*grunt.registerTask('default', [
        'serve'
    ]);*/
};
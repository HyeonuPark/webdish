module.exports = function(grunt) {
    grunt.initConfig({
        uglify : {
            target : {
                files : {
                    'js/app.min.js' : [
                        'js/angular.min.js',
                        'js/binary.min.js',
                        'js/highlight.js',
                        'js/sizechecker.js',
                        'js/ui-bootstrap.min.js',
                        'js/ui-router.min.js',
                        'js/wikimark.js',
                        'js/app.js'
                    ],
                    'js/m.app.min.js' : [
                        'js/sizechecker.js',
                        'js/wikimark.js'
                    ]
                }
            }
        },
        cssmin : {
            target : {
                files : {
                    'css/app.min.css' : [
                        'css/bootstrap.min.css',
                        'css/bootstrap-theme.min.css',
                        'css/highlight.css',
                        'css/app.css'
                    ],
                    'css/m.app.min.css' : [
                        'css/highlight.css'
                    ]
                }
            }
        },
        processhtml : {
            dist : {
                files : {
                    'index.raw.html' : 'dev.html',
                    'm/index.raw.html' : 'm/dev.html'
                }
            }
        },
        htmlmin : {
            dist : {
                options : {
                    removeComments : true,
                    collapseWhitespace : true
                },
                files : {
                    'index.html' : 'index.raw.html',
                    'm/index.html' : 'm/index.raw.html'
                }
            }
        },
        bump : {
            options : {
                commitMessage : grunt.template.today('yyyy-mm-dd ddd HH:MM:ss') + ' HyeonuPark <nemo1275@gmail.com>',
                commitFiles : ['-a'],
                createTag : false,
                pushTo : 'github'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-bump');

    grunt.registerTask('default', ['uglify', 'cssmin', 'processhtml', 'htmlmin', 'bump']);
}
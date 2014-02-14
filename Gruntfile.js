module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),


        // Configuration de concat, outil pour concatener le JS
        concat: {
            options: {
                separator: ';'
            },
            inte: {
                src: 'assets/js/src/**/*.js',
                dest: 'assets/js/build/teq-inte.js'
            },
            plugins: {
                src: 'assets/js/vendor/plugins/**/*.js',
                dest: 'assets/js/build/plugins-inte.js'
            }
        },


        // Configuration d'uglify, outil pour minifier le JS
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            dist: {
                files: {
                    'assets/js/teq-inte.min.js': '<%= concat.inte.dest %>',
                    'assets/js/plugins-inte.min.js': '<%= concat.plugins.dest %>'
                }
            }
        },


        // Configuration d'imagemin, outil pour la compression d'images
        imagemin: {
            options: {
                optimizationLevel: 3
            },
            css: {
                files: [{
                    expand: true,
                    cwd: 'assets/css/images/',
                    src: ['**/*.{png, jpg, gif}'],
                    dest: 'assets/css/images/'
                }]
            },
            html: {
                files: [{
                    expand: true,
                    cwd: 'assets/media/',
                    src: ['**/*.{png, jpg, gif}'],
                    dest: 'assets/media/'
                }]
            }
        },


        // Configuration de compass, préprocesseur de CSS
        compass: {
            options: {
                sassDir:        'assets/css/sass',
                imagesDir:      'assets/css/images',
                fontsPath:      'assets/css/fonts',
                javascriptsDir: 'assets/js',
                relativeAssets: true,
                noLineComments: true,
                force:          true
            },
            inte: {
                options: {
                    cssDir:      'assets/css',
                    debugInfo:    true,
                    outputStyle: 'expanded'
                }
            },
            clean: {
                options: {
                    cssDir:      'assets/css',
                    outputStyle: 'expanded'
                }
            }
        },


        // Configuration de browser-sync, outil d'injection CSS
        browser_sync: {
            files: {
                src : 'assets/css/main.css'
            },
            options: {
                watchTask: true,
                server: {
                    baseDir: "app"
                }
            }
        },


        // Configuration de watch
        watch: {
            options: {
                livereload: false
            },
            css: {
                files: ['assets/css/sass/**/*.scss'],
                tasks: ['compass:inte']
            },
            js: {
                files: ['assets/js/**/*.js'],
                tasks: ['concat', 'uglify']
            }
        }

    });

    // Charger les plugins
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    // Tâches par défaut
    grunt.registerTask('default', ['browser_sync', 'watch']);

    // Tâches customs
    grunt.registerTask('js', ['concat', 'uglify']);
    grunt.registerTask('css', ['compass:clean']);
    grunt.registerTask('img', ['imagemin']);
};
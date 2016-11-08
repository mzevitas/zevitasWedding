module.exports = function(grunt){
	grunt.initConfig({

		concat : { //name of task
			options :{
				separator: '\n\n//---------------------------\n\n'
			},
			dist : { //name of job for that task
				src: ['dev/scripts/*.js'],
				dest: 'dist/js/script.js'
			}
		},//concat

		bower_concat:{
			all: {
				dest: 'dist/js/_bower.js',
				cssDest: 'dist/css/_bower.css'
			}
		},

		sass: {
			dist: {
				options: { //look at plugin website for various options
					style: 'expanded'
				},
				files: [{
					src: 'dev/sass/style.scss',
					dest: 'dist/css/style.css'
				}]
			}
		}, //sass

		connect: {
			server: {
				options: {
					hostname: 'localhost',
					port: 3000,
					base: 'dist/',
					livereload: true
				}
			}
		},

		watch: {
			options: {
				spawn: false,
				livereload: true
			},
			scripts: {
				files: ['dist/**/*.html', 
				'dev/scripts/**/*.js',
				'dev/sass/**/*.scss'],
				tasks: ['concat','sass']
			}
		}

	}); //init config section

	grunt.loadNpmTasks('grunt-contrib-concat'); //concatenates files
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-bower-concat');
	grunt.registerTask('default', ['bower_concat', 'concat', 'sass', 'connect', 'watch']);

}; //wrapper function